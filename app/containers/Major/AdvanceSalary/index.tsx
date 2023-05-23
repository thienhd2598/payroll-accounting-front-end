import { ExclamationCircleFilled, PlusOutlined, WalletOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Modal, Row, Select, Skeleton, Space, Spin, Table, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../../Layout/LayoutContext';
import buildColumn from './components/AdvanceSalaryColumn';
import StaffService from 'services/Staff/Staff.service';
import { useQuery } from 'react-query';
import { formatNumberToCurrency } from 'utils/helper';


const { confirm } = Modal;
const { Column } = Table;
const { Option } = Select;
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
    const [showModal, setShowModal] = useState<boolean>(false);
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
                title: 'Tạm ứng lương',
                pathname: '/ung-luong/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: number) => {
        confirm({
            title: `Bạn có muốn xoá Ứng lương này?`,
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
            <Helmet titleTemplate="Tạm ứng lương - Admin" defaultTitle="Tạm ứng lương - Admin">
                <meta name="description" content="Tạm ứng lương - Admin" />
            </Helmet>
            <Card
                style={{ marginBottom: 20 }}
                title="Danh sách tạm ứng lương"
                bordered={false}
                extra={
                    <Button
                        type="primary"
                        className="btn-base"
                        icon={<WalletOutlined className="icon-base" />}
                        onClick={() => setShowModal(true)}
                    >
                        Ứng lương nhân viên
                    </Button>
                }
            >
                <Space className='space-base' direction="vertical" size={30}>
                    <TableCommon
                        dataSource={[
                            { id: 1, name: 'Ứng lương tháng 1 - 2023', staff: 'Nguyễn Khánh Thiện', price: 1500000, note: 'Ứng lương chi tiêu' },
                            { id: 1, name: 'Ứng lương tháng 1 - 2023', staff: 'Nguyễn Thị Ánh Lê', price: 1500000, note: 'Ứng lương chi tiêu' },
                            { id: 1, name: 'Ứng lương tháng 1 - 2023', staff: 'Trần Phương Linh', price: 1500000, note: 'Ứng lương chi tiêu' },
                            { id: 1, name: 'Ứng lương tháng 1 - 2023', staff: 'Nguyễn Thị Ánh Lê', price: 1500000, note: 'Ứng lương chi tiêu' },
                            { id: 1, name: 'Ứng lương tháng 1 - 2023', staff: 'Lò Thị Trang', price: 1500000, note: 'Ứng lương chi tiêu' },
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

            <Modal
                title="Tạo phiếu ứng lương"
                open={showModal}
                keyboard={true}
                bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
                style={{ top: 150 }}
                width={500}
                onCancel={() => setShowModal(false)}
                footer={[
                    <Space size={20}>
                        <Button
                            type="primary"
                            className="btn-base"
                            loading={false}
                            onClick={() => { }}
                            style={{ background: '#1677ff' }}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            type="primary"
                            className="btn-base"
                            danger
                            disabled={false}
                            onClick={() => setShowModal(false)}
                        >
                            Huỷ bỏ
                        </Button>
                    </Space>
                ]}
            >
                <Spin spinning={false}>
                    <Form
                        form={form}
                        name="basic"
                        style={{ marginTop: 20 }}
                        layout="vertical"
                        initialValues={{ remember: true }}
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Nhân viên"
                                    rules={[
                                        { required: true, message: 'Nhân viên không được để trống!' },
                                    ]}
                                >
                                    <Select
                                        className="input-item"
                                        placeholder="Chọn nhân viên"
                                        allowClear
                                    >
                                        {[
                                            { id: 1, name: 'Nguyễn Khánh Thiện' },
                                            { id: 2, name: 'Trần Phương Linh' },
                                            { id: 3, name: 'Lê Thị Ánh' },
                                            { id: 4, name: 'Lò Văn Mạnh' },
                                        ]?.map((_document: any, index: number) => (
                                            <Option value={_document.id} key={`document-change-status-${index}`}>
                                                {_document?.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Tên mẫu ứng lương"
                                    rules={[
                                        { required: true, message: 'Tên mẫu ứng lương không được để trống!' },
                                    ]}
                                >
                                    <Input
                                        className="input-item"
                                        placeholder="Tên mẫu ứng lương"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    <Text>Tài khoản nợ: <strong>334</strong></Text>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    <Text>Tài khoản có: <strong>141</strong></Text>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="price"
                                    label="Số tiền tạm ứng"
                                    rules={[
                                        { required: true, message: 'Số tiền tạm ứng không được để trống!' },
                                    ]}
                                >
                                    <Input
                                        className="input-item"
                                        placeholder="Số tiền tạm ứng"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="note"
                                    label="Diễn giải"
                                    rules={[
                                        { required: true, message: 'Diễn giải không được để trống!' },
                                    ]}
                                >
                                    <Input
                                        className="input-item"
                                        placeholder="Diễn giải"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Modal>
        </React.Fragment>
    );
};

export default memo(Page);
