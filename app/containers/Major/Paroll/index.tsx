import { CaretRightOutlined, DeleteOutlined, ExclamationCircleFilled, PlusOutlined, PrinterOutlined, SendOutlined, WalletOutlined } from '@ant-design/icons';
import { Button, Card, Col, ConfigProvider, DatePicker, Form, Modal, Row, Select, Skeleton, Space, Spin, Table, Tooltip, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../../Layout/LayoutContext';
import { Collapse, Divider } from 'antd';
import buildColumn from './components/TimeKeepingColumn';
import { formatNumberToCurrency } from 'utils/helper';
import dayjs from 'dayjs';
import locale from 'antd/lib/locale/vi_VN';

const { Panel } = Collapse;

const { Option } = Select;
const { confirm } = Modal;
const { Text } = Typography;

const columns: any = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: 50,
        fixed: 'left',
        render: (id: number, row, index: number) => (
            <Text>{index + 1}</Text>
        ),
    },
    {
        title: 'Tên nhân viên',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        fixed: 'left',
        render: (name) => (
            <Text>{name || '--'}</Text>
        ),
    },
    {
        title: 'Số công',
        dataIndex: 'b1',
        key: 'b1',
        width: 100,
        render: (b) => (
            <Text>{formatNumberToCurrency(b) || '--'}</Text>
        ),
    },
    {
        title: 'Lương cơ bản',
        dataIndex: 'b2',
        key: 'b2',
        width: 100,
        render: (b) => (
            <Text>{formatNumberToCurrency(b) || '--'}</Text>
        ),
    },
    {
        title: 'Giờ làm thêm',
        children: [
            {
                title: 'Ngày thường',
                dataIndex: 'b3',
                key: 'b3',
                width: 100,
                render: (b) => (
                    <Text>{formatNumberToCurrency(b) || '--'}</Text>
                ),
            },
            {
                title: 'Ngày lễ',
                dataIndex: 'b4',
                key: 'b4',
                width: 100,
                render: (b) => (
                    <Text>{formatNumberToCurrency(b) || '--'}</Text>
                ),
            },
        ],
    },
    {
        title: 'Tổng tiền làm thêm',
        dataIndex: 'b5',
        key: 'b5',
        width: 100,
        render: (b) => (
            <Text>{formatNumberToCurrency(b) || '--'}</Text>
        ),
    }
    , {
        title: 'Phụ cấp',
        dataIndex: 'b6',
        key: 'b6',
        width: 100,
        render: (b) => (
            <Text>{formatNumberToCurrency(b) || '--'}</Text>
        ),
    },
    {
        title: 'Khấu trừ',
        children: [
            {
                title: 'BHXH',
                dataIndex: 'b7',
                key: 'b7',
                width: 100,
                render: (b) => (
                    <Text>{formatNumberToCurrency(b) || '--'}</Text>
                ),
            },
            {
                title: 'BHYT',
                dataIndex: 'b8',
                key: 'b8',
                width: 100,
                render: (b) => (
                    <Text>{formatNumberToCurrency(b) || '--'}</Text>
                ),
            },
            {
                title: 'BHTN',
                dataIndex: 'b9',
                key: 'b9',
                width: 100,
                render: (b) => (
                    <Text>{formatNumberToCurrency(b) || '--'}</Text>
                ),
            },
        ],
    },
    {
        title: 'Tổng lương',
        dataIndex: 'b10',
        key: 'b10',
        width: 100,
        render: (b) => (
            <Text>{formatNumberToCurrency(b) || '--'}</Text>
        ),
    },
    {
        title: 'Khấu trừ TNCN',
        children: [
            {
                title: 'NPT',
                dataIndex: 'b11',
                key: 'b11',
                width: 100,
                render: (b) => (
                    <Text>{formatNumberToCurrency(b) || '--'}</Text>
                ),
            },
            {
                title: 'TN tính thuế',
                dataIndex: 'b12',
                key: 'b12',
                width: 100,
                render: (b) => (
                    <Text>{formatNumberToCurrency(b) || '--'}</Text>
                ),
            },
        ],
    },
    {
        title: 'Thực lĩnh',
        dataIndex: 'b13',
        key: 'b13',
        width: 100,
        render: (b) => (
            <Text>{formatNumberToCurrency(b) || '--'}</Text>
        ),
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        align: 'center',
        width: 100,
        render: (_, record: any) => {
            return (
                <Space direction="horizontal" size={15}>
                    <Tooltip placement="top" title="Xuất báo cáo">
                        <Button
                            size="middle"
                            type="primary"
                            shape="circle"
                            icon={<PrinterOutlined className='icon-base' />}
                            style={{ background: '#13c2c2' }}
                            onClick={() => { }}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title="Xoá">
                        <Button
                            size="middle"
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined className='icon-base' />}
                            danger
                            onClick={() => { }}
                        />
                    </Tooltip>
                </Space>
            );
        },
    },
]

const Page = () => {
    const client = createApolloClient();
    const { appendBreadcrumb } = useLayoutContext();

    const [form] = Form.useForm();
    const [showPayroll, setShowPayroll] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');

    useLayoutEffect(() => {
        appendBreadcrumb([
            {
                title: 'Trang chủ',
                pathname: '/',
            },
            {
                title: 'Tính lương',
                pathname: '/tinh-luong/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: number) => {
        confirm({
            title: `Bạn có muốn xoá chấm công này?`,
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
            <Helmet titleTemplate="Tính lương - Admin" defaultTitle="Tính lương - Admin">
                <meta name="description" content="Tính lương - Admin" />
            </Helmet>
            <Modal
                title={'Tính lương nhân viên'}
                open={showPayroll}
                keyboard={true}
                bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
                style={{ top: 150 }}
                width={600}
                onCancel={() => {
                    setShowPayroll(false)
                }}
                footer={[
                    <Space size={20}>
                        <Button
                            type="primary"
                            className="btn-base"
                            loading={false}
                            style={{ background: '#1677ff' }}
                            onClick={() => { }}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            type="primary"
                            className="btn-base"
                            danger
                            onClick={() => {
                                form.resetFields();
                                setShowPayroll(false);
                            }}
                        >
                            Huỷ
                        </Button>
                    </Space>,
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
                        <Row gutter={30}>
                            <Col span={24}>
                                <Form.Item
                                    label={<Text>Thời gian tính lương:</Text>}
                                    name="plan_number"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject('Thời gian tính lương không được để trống'),
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        picker="month"
                                        className='input-item'
                                        format={`[Tháng] MM [năm] YYYY`}                                    
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="staff"
                                    label="Nhân viên"
                                    rules={[
                                        { required: true, message: 'Nhân viên không được để trống!' },
                                    ]}
                                >
                                    <Select
                                        className="input-item"
                                        placeholder="Chọn Nhân viên nhân viên"
                                        allowClear
                                    >
                                        {[
                                            { title: 'Nguyễn Khánh Thiện', id: 1 },
                                            { title: 'Trần Phương Linh', id: 2 },
                                            { title: 'Cù Huy Thành', id: 3 },
                                            { title: 'Lê Thị Ánh', id: 4 },
                                        ]?.map((_document: any, index: number) => (
                                            <Option value={_document.id} key={`document-change-status-${index}`}>
                                                {_document?.title}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Modal>

            <Row justify="space-between" style={{ marginBottom: 30 }}>
                <Space style={{ display: 'flex', alignItems: 'flex-start' }} size={20}>
                    <Text strong>Công thức tính lương:</Text>
                    <Card>
                        <Text strong style={{ display: 'block', color: '#ff100d', fontStyle: 'italic' }}>Tổng thu nhập = tổng các khoản được nhận</Text>
                        <Text strong style={{ display: 'block', color: '#ff100d', fontStyle: 'italic' }}>Lương thực lĩnh = tổng các khoản được nhận – tổng các khoản khấu trừ</Text>
                    </Card>
                </Space>
                <Button
                    type="primary"
                    className="btn-base"
                    style={{ float: 'right', marginBottom: 20 }}
                    icon={<WalletOutlined className="icon-base" />}
                    onClick={() => setShowPayroll(true)}
                >
                    Tính lương nhân viên
                </Button>
            </Row>
            <Space className='space-base' direction="vertical" size={30}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <Collapse
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        bordered={false}
                        style={{ background: '#fff' }}
                    >
                        <Panel header={
                            <Space className='space-base' style={{ justifyContent: 'space-between' }}>
                                <Text strong>{`Lương tháng ${item} - 2023`}</Text>
                            </Space>
                        } key="1">
                            <TableCommon
                                scroll={{ x: 1800 }}
                                dataSource={[
                                    { id: 1, name: 'Nguyễn Khánh Thiện', b1: 22, b2: 18000000, b3: 2, b4: 1, b5: 1200000, b6: 500000, b7: 80000, b8: 80000, b9: 80000, b10: 16000000, b11: 1, b12: 2, b13: 15500000 },
                                    { id: 2, name: 'Trần Phương Linh', b1: 22, b2: 18000000, b3: 2, b4: 1, b5: 1200000, b6: 500000, b7: 80000, b8: 80000, b9: 80000, b10: 16000000, b11: 1, b12: 2, b13: 15500000 },
                                    { id: 3, name: 'Lê Thị Ánh', b1: 22, b2: 18000000, b3: 2, b4: 1, b5: 1200000, b6: 500000, b7: 80000, b8: 80000, b9: 80000, b10: 16000000, b11: 1, b12: 2, b13: 15500000 },
                                    { id: 4, name: 'Cù Huy Thành', b1: 22, b2: 18000000, b3: 2, b4: 1, b5: 1200000, b6: 500000, b7: 80000, b8: 80000, b9: 80000, b10: 16000000, b11: 1, b12: 2, b13: 15500000 },
                                    { id: 5, name: 'Đan Thị Linh', b1: 22, b2: 18000000, b3: 2, b4: 1, b5: 1200000, b6: 500000, b7: 80000, b8: 80000, b9: 80000, b10: 16000000, b11: 1, b12: 2, b13: 15500000 },
                                ]}
                                loading={false}
                                pagination={{
                                    showTotal: (total: number) => <Text>Tổng số {total}</Text>,
                                }}
                                columns={columns}
                                onChangePagination={() => { }}
                            />
                        </Panel>
                    </Collapse>
                ))}
            </Space>
        </React.Fragment>
    );
};

export default memo(Page);
