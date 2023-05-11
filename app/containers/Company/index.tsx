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
import buildColumn from './components/CompanyColumn';
import DocumentInputColumn from './components/CompanyColumn';
import CompanyService from 'services/Company/Company.service';
import { showAlert } from 'utils/helper';
import { useMutation, useQuery } from 'react-query';
import ModalCompany from './components/ModalCompany';

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
        key: 'tax_code',
        title: 'Tìm theo mã số thuế',
        type: 'input'
    },
];

const dataTest = [
    {
        id: 1,
        date: '25/10/1998',
    },
    {
        id: 2,
        date: '25/10/1998',
    },
    {
        id: 3,
        date: '25/10/1998',
    },
    {
        id: 4,
        date: '25/10/1998',
    },
    {
        id: 5,
        date: '25/10/1998',
    },
] as any;

const Page = () => {
    const client = createApolloClient();
    const { appendBreadcrumb } = useLayoutContext();

    const [form] = Form.useForm();
    const [action, setAction] = useState<string>('');
    const [currentData, setCurrentData] = useState<any>(null);

    const { isLoading: loadingListCompany, data: dataListCompany, refetch } = useQuery('GET_LIST_COMPANY', async () => {
        let response = await CompanyService.getListCompany({});

        return response.data;
    });

    const { isLoading: loadingDeleteCompany, mutate: mutateDeleteCompany } = useMutation(
        (id: number) => {
            return CompanyService.deleteCompany({ id })
        }, {
        onSuccess: (res) => {
            if (res.status === 200) {
                showAlert.success('Xóa doanh nghiệp thành công');
                refetch();                
            } else {
                showAlert.error(res.message || 'Đã có lỗi xảy ra, vui lòng thử lại')
            }
            console.log({ res })
        },
        onError: (err: Error) => {
            showAlert.error(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
        },
    }
    );

    useLayoutEffect(() => {
        appendBreadcrumb([
            {
                title: 'Trang chủ',
                pathname: '/',
            },
            {
                title: 'Quản lý doanh nghiệp',
                pathname: '/quan-ly-doanh-nghiep/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: number) => {
        confirm({
            title: `Bạn có muốn xoá doanh nghiệp này?`,
            icon: <ExclamationCircleFilled />,
            style: { top: 200 },
            okText: 'Xác nhận',
            cancelText: 'Huỷ bỏ',
            okButtonProps: {
                type: 'primary',
                className: 'btn-base',
            },
            cancelButtonProps: {
                type: 'primary',
                danger: true,
                className: 'btn-base',
            },
            onOk: async () => {
                mutateDeleteCompany(id);
            },
            onCancel() { },
        });
    }, []);

    return (
        <React.Fragment>
            <Helmet titleTemplate="Quản lý doanh nghiệp - Admin" defaultTitle="Quản lý doanh nghiệp - Admin">
                <meta name="description" content="Quản lý doanh nghiệp - Admin" />
            </Helmet>
            <ModalCompany
                action={action}
                onHide={() => {
                    setAction('');
                    setCurrentData(null);
                }}
                refetchLstCompany={refetch}
                currentData={currentData}
            />
            <Card
                style={{ marginBottom: 20 }}
                title="Danh sách doanh nghiệp"
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
                    <FilterCommon
                        form={form}
                        loading={loadingListCompany}
                        dataFilter={dataFilter}
                        onSearch={() => { }}
                        onReSearch={() => { }}
                    />
                    <TableCommon
                        dataSource={dataListCompany || []}
                        loading={loadingListCompany || loadingDeleteCompany}
                        pagination={{
                            showTotal: (total: number) => <Text>Tổng số {total}</Text>,
                        }}
                        columns={buildColumn({
                            showConfirmDelete,
                            onEdit: (data: number) => {
                                setAction('edit');
                                setCurrentData(data);
                            }
                        })}
                        onChangePagination={() => { }}
                    />
                </Space>
            </Card>
        </React.Fragment>
    );
};

export default memo(Page);
