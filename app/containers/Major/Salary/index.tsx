import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Modal, Row, Select, Skeleton, Space, Table, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../../Layout/LayoutContext';
import buildColumn from './components/SalaryInformationColumn';
import StaffService from 'services/Staff/Staff.service';
import { useMutation, useQuery } from 'react-query';
import ModalSalaryInformation from './components/ModalSalaryInformation';
import SalaryInformationService from 'services/SalaryInformation/SalaryInformation.service';
import { showAlert } from 'utils/helper';


const { confirm } = Modal;
const { Column } = Table;
const { Text } = Typography;
const { Option } = Select;

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
        'GET_LIST_SALARY_INFORMATION',
        async () => {
            const response = await SalaryInformationService.getAllSalaryInformation();

            console.log({ response })
            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });

    const { isLoading: loadingDeleteSalaryInformation, mutate: mutateDeleteSalaryInformation, } = useMutation(
        (id: string) => {
            return SalaryInformationService.deleteSalaryInformation(id);
        }, {
        onSuccess: (res: any) => {            
            if (res?.statusCode === 200) {
                showAlert.success('Xóa tham số lương thành công');
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
                title: 'Quản lý tham số lương',
                pathname: '/tham-so-luong/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: string) => {
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
                mutateDeleteSalaryInformation(id)
            },
            onCancel() { },
        });
    }, []);

    return (
        <React.Fragment>
            <Helmet titleTemplate="Quản lý tham số lương - Admin" defaultTitle="Quản lý tham số lương - Admin">
                <meta name="description" content="Quản lý tham số lương - Admin" />
            </Helmet>
            <ModalSalaryInformation
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
                title="Danh sách tham số lương"
                bordered={false}
                extra={
                    <Button
                        type="primary"
                        className="btn-base"
                        icon={<PlusOutlined className="icon-base" />}
                        onClick={() => {
                            setAction('create');
                            setCurrentData(null);
                        }}
                    >
                        Thêm mới
                    </Button>
                }
            >
                <Space className='space-base' direction="vertical" size={30}>                    
                    <TableCommon
                        dataSource={data?.salaryInformations || []}
                        loading={isLoading || loadingDeleteSalaryInformation}
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
