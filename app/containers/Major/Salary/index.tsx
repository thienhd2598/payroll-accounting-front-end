import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Modal, Row, Skeleton, Space, Table, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../../Layout/LayoutContext';
import buildColumn from './components/SalaryColumn';
import StaffService from 'services/Staff/Staff.service';
import { useQuery } from 'react-query';
import { formatNumberToCurrency } from 'utils/helper';


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
                title: 'Tham số lương',
                pathname: '/quan-ly-phong-ban/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: number) => {
        confirm({
            title: `Bạn có muốn xoá tham số lương này?`,
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
            <Helmet titleTemplate="Tham số lương - Admin" defaultTitle="Tham số lương - Admin">
                <meta name="description" content="Tham số lương - Admin" />
            </Helmet>            
            <Card
                style={{ marginBottom: 20 }}
                title="Danh sách tham số lương"
                bordered={false}                
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
                            { id: 1, name: 'Nguyễn Khánh Thiện', b1: 18000000, b2: 22, b3: 8, b4: 0.08, b5: 0.015, b6: 0.01 },
                            { id: 2, name: 'Nguyễn Thị Ánh Lê', b1: 9500000, b2: 22, b3: 8, b4: 0.04, b5: 0.02, b6: 0.01 },
                            { id: 3, name: 'Trần Phương Linh', b1: 6500000, b2: 22, b3: 8, b4: 0.04, b5: 0.02, b6: 0.01 },
                            { id: 4, name: 'Đinh Công Mạnh', b1: 12000000, b2: 22, b3: 8, b4: 0.06, b5: 0.015, b6: 0.01 },
                            { id: 5, name: 'Lò Thị Trang', b1: 11500000, b2: 22, b3: 8, b4: 0.06, b5: 0.02, b6: 0.01 },
                            { id: 6, name: 'Phạm Đức Anh Tuấn', b1: 10000000, b2: 22, b3: 8, b4: 0.06, b5: 0.015, b6: 0.01 },                            
                        ]}
                        scroll={{ x: 1550 }}
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
