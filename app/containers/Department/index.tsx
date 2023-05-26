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
import { useMutation, useQuery } from 'react-query';
import ModalDepartment from './components/ModalDepartment';
import DepartmentService from 'services/Department/Department.service';
import { showAlert } from 'utils/helper';


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
    const [currentData, setCurrentData] = useState(null);
    const [action, setAction] = useState<string>('');

    const { isLoading, data, refetch } = useQuery(
        'GET_LIST_DEPARTMENT',
        async () => {
            const response = await DepartmentService.getAllDepartment();

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });

    const { isLoading: loadingDeleteDepartment, mutate: mutateDeleteDepartment, } = useMutation(
        (id: string) => {
            return DepartmentService.deleteDepartment(id);
        }, {
        onSuccess: (res: any) => {            
            if (res?.statusCode === 200) {
                showAlert.success('Xóa phòng ban thành công');
                refetch();                
            } else {
                showAlert.error(res?.message || 'Đã có lỗi xảy ra, vui lòng thử lại')
            }
            console.log({ res })
        },
        onError: (err: Error) => {
            showAlert.error(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
        },
    }
    );

    console.log({ data });

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

    const showConfirmDelete = useCallback((id: string) => {
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
                mutateDeleteDepartment(id)
            },
            onCancel() { },
        });
    }, []);

    return (
        <React.Fragment>
            <Helmet titleTemplate="Quản lý phòng ban - Admin" defaultTitle="Quản lý phòng ban - Admin">
                <meta name="description" content="Quản lý phòng ban - Admin" />
            </Helmet>
            <ModalDepartment
                action={action}
                refetch={refetch}
                currentData={currentData}
                onHide={() => {
                    setAction('');
                    setCurrentData(null);
                }}
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
                        dataSource={data?.departments || []}
                        loading={isLoading || loadingDeleteDepartment}
                        pagination={{
                            showTotal: (total: number) => <Text>Tổng số {total}</Text>,
                        }}
                        columns={buildColumn({ showConfirmDelete, setCurrentData:(data) => {
                            setCurrentData(data);
                            setAction('edit')
                        } })}
                        onChangePagination={() => { }}
                    />
                </Space>
            </Card>
        </React.Fragment>
    );
};

export default memo(Page);
