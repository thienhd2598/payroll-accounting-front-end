import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Modal, Row, Skeleton, Space, Table, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../Layout/LayoutContext';
import buildColumn from './components/PositionColumn';
import StaffService from 'services/Staff/Staff.service';
import { useQuery } from 'react-query';
import ModalStaff from './components/ModalPosition';


const { confirm } = Modal;
const { Column } = Table;
const { Text } = Typography;

const dataFilter: Array<any> = [
    {
        key: 'keyword',
        title: 'Tìm theo tên',
        type: 'input'
    },
    {
        key: 'email',
        title: 'Tìm theo email',
        type: 'input'
    },
];

const Page = () => {
    const client = createApolloClient();
    const { appendBreadcrumb } = useLayoutContext();

    const [form] = Form.useForm();
    const [action, setAction] = useState<string>('');

    const { isLoading: loadingListStaff, data: dataListStaff, refetch } = useQuery(
        'GET_LIST_STAFF',
        async () => {
            const response = await StaffService.getListStaff({});

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });

    useLayoutEffect(() => {
        appendBreadcrumb([
            {
                title: 'Trang chủ',
                pathname: '/',
            },
            {
                title: 'Quản lý chức vụ',
                pathname: '/quan-ly-chuc-vu/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: number) => {
        confirm({
            title: `Bạn có muốn xoá chức vụ này?`,
            icon: <ExclamationCircleFilled />,
            style: { top: '35vh' },
            okText: 'Xoá',
            cancelText: 'Huỷ bỏ',
            okButtonProps: {
                type: 'primary',
                style: { minWidth: 80 }
            },
            cancelButtonProps: {
                type: 'primary',
                danger: true,
                style: { minWidth: 80 }
            },
            onOk: async () => {
            },
            onCancel() { },
        });
    }, []);

    return (
        <React.Fragment>
            <Helmet titleTemplate="Quản lý chức vụ - Admin" defaultTitle="Quản lý chức vụ - Admin">
                <meta name="description" content="Quản lý chức vụ - Admin" />
            </Helmet>
            <ModalStaff
                action={action}
                refetch={refetch}
                currentData={null}
                onHide={() => setAction('')}
            />
            <Card
                style={{ marginBottom: 20 }}
                title="Danh sách chức vụ"
                bordered={false}
                extra={
                    <Button
                        type="primary"
                        className="btn-base"
                        icon={<PlusOutlined className="icon-base" />}
                        onClick={() => setAction('create')}
                    >
                        Thêm mới
                    </Button>
                }
            >
                <Space className='space-base' direction="vertical" size={30}>
                    {/* <FilterCommon
                        form={form}
                        loading={false}
                        dataFilter={dataFilter}
                        onSearch={() => { }}
                        onReSearch={() => { }}
                    /> */}
                    <TableCommon
                        dataSource={[
                            { id: 1, name: 'Giám đốc', status: 1 },                            
                            { id: 2, name: 'Phó giám đốc', status: 0 },                            
                            { id: 3, name: 'CTO', status: 1 },                            
                            { id: 4, name: 'Kế toán trưởng', status: 1 },                            
                            { id: 5, name: 'Trưởng nhóm', status: 1 },                            
                            { id: 6, name: 'Nhân viên', status: 1 },                            
                        ]}
                        loading={false}
                        pagination={{
                            showTotal: (total: number) => <Text>Tổng số {total}</Text>,
                        }}
                        columns={buildColumn({ showConfirmDelete })}
                        onChangePagination={() => { }}
                    />
                </Space>
            </Card>
        </React.Fragment>
    );
};

export default memo(Page);
