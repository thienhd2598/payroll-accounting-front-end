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
import buildColumn from './components/IncomeTaxColumn';
import StaffService from 'services/Staff/Staff.service';
import { useMutation, useQuery } from 'react-query';
import ModalIncomeTax from './components/ModalIncomeTax';
import IncomeTaxService from 'services/IncomeTax/IncomeTax.service';
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
        '   GET_LIST_INCOMETAX',
        async () => {
            const response = await IncomeTaxService.getAllIncomeTax();

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });

    const { isLoading: loadingDeleteIncomeTax, mutate: mutateDeleteIncomeTax, } = useMutation(
        (id: string) => {
            return IncomeTaxService.deleteIncomeTax(id);
        }, {
        onSuccess: (res: any) => {            
            if (res?.statusCode === 200) {
                showAlert.success('Xóa cấp bậc thuế thành công');
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

    useLayoutEffect(() => {
        appendBreadcrumb([
            {
                title: 'Trang chủ',
                pathname: '/',
            },
            {
                title: 'Quản lý cấp bậc thuế',
                pathname: '/thue-thu-nhap-ca-nhan/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: string) => {
        confirm({
            title: `Bạn có muốn xoá cấp bậc thuế này?`,
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
                mutateDeleteIncomeTax(id)
            },
            onCancel() { },
        });
    }, []);

    return (
        <React.Fragment>
            <Helmet titleTemplate="Quản lý cấp bậc thuế - Admin" defaultTitle="Quản lý cấp bậc thuế - Admin">
                <meta name="description" content="Quản lý cấp bậc thuế - Admin" />
            </Helmet>
            <ModalIncomeTax
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
                title="Danh sách cấp bậc thuế"
                bordered={false}
                extra={
                    <Button
                        type="primary"
                        className="btn-base"
                        icon={<PlusOutlined className="icon-base" />}
                        onClick={() => {
                            setAction('create')
                            setCurrentData(null);
                        }}
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
                        dataSource={data?.incomeTaxs || []}
                        loading={isLoading || loadingDeleteIncomeTax}
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
