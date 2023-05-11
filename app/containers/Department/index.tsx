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
import buildColumn from './components/DepartmentColumn';
import StaffService from 'services/Staff/Staff.service';
import { useQuery } from 'react-query';
import ModalStaff from './components/ModalDepartment';


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
                title: 'Quản lý phòng ban',
                pathname: '/quan-ly-phong-ban/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: number) => {
        confirm({
            title: `Bạn có muốn xoá phòng ban này?`,
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
            <Helmet titleTemplate="Quản lý phòng ban - Admin" defaultTitle="Quản lý phòng ban - Admin">
                <meta name="description" content="Quản lý phòng ban - Admin" />
            </Helmet>
            <ModalStaff
                action={action}
                refetch={refetch}
                currentData={null}
                onHide={() => setAction('')}
            />
            <Card
                style={{ marginBottom: 20 }}
                title="Danh sách phòng ban"
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
                            { id: 1, name: 'Công nghệ', phone: '0356924848', status: 1 },
                            { id: 2, name: 'Vận hành', phone: '0356924848', status: 1 },
                            { id: 3, name: 'Kế toán', phone: '0356924848', status: 1 },
                            { id: 4, name: 'Grow 1', phone: '0356924848', status: 1 },
                            { id: 5, name: 'Grow 2', phone: '0356924848', status: 0 },
                            { id: 6, name: 'Grow 3', phone: '0356924848', status: 1 },
                            { id: 7, name: 'Hành chính nhân sự', phone: '0356924848', status: 0 },
                            { id: 8, name: 'Media', phone: '0356924848', status: 1 },
                            { id: 9, name: 'Marketing', phone: '0356924848', status: 1 },
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
