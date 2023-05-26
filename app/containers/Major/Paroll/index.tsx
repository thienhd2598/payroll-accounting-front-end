import { CaretRightOutlined, DeleteOutlined, ExclamationCircleFilled, PlusOutlined, PrinterOutlined, SendOutlined, WalletOutlined } from '@ant-design/icons';
import { Button, Card, Col, ConfigProvider, DatePicker, Empty, Form, Modal, Row, Select, Skeleton, Space, Spin, Table, Tooltip, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useMemo, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../../Layout/LayoutContext';
import { Collapse, Divider } from 'antd';
import buildColumn from './components/TimeKeepingColumn';
import { formatNumberToCurrency, showAlert } from 'utils/helper';
import dayjs from 'dayjs';
import locale from 'antd/lib/locale/vi_VN';
import { useMutation, useQuery } from 'react-query';
import StaffService from 'services/Staff/Staff.service';
import * as _ from 'lodash';
import HtmlPrint from './components/HtmlPrint';

const { Panel } = Collapse;

const { Option } = Select;
const { confirm } = Modal;
const { Text } = Typography;

const Page = () => {
    const client = createApolloClient();
    const { appendBreadcrumb } = useLayoutContext();

    const [form] = Form.useForm();
    const [showPayroll, setShowPayroll] = useState<boolean>(false);
    const [dataPayroll, setDataPayroll] = useState<any>([]);
    const [action, setAction] = useState<string>('');
    const [isShow, setIsShow] = useState<boolean>(false);
    const [currentParoll, setCurrentParoll] = useState<any>(null);

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

    const { isLoading: isLoadingStaff, data: dataStaff } = useQuery(
        'GET_LIST_STAFF_OPTIONS',
        async () => {
            const response = await StaffService.getAllStaff();

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });

    const { isLoading: loadingPayroll, mutate: mutatePayroll } = useMutation(
        (params: any) => {
            return StaffService.payrollStaff(params);
        }, {
        onSuccess: (res: any) => {
            console.log({ res });
            if (res.statusCode === 200) {
                showAlert.success(res?.message || 'Tính lương thành công');
                form.resetFields();
                setShowPayroll(false);
                setDataPayroll(prev => prev.concat(res?.data));
            } else {
                showAlert.error(res?.message || 'Đã có lỗi xảy ra, vui lòng thử lại')
            }
        },
        onError: (err: Error) => {
            showAlert.error(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
        },
    }
    );

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
            dataIndex: 'work_days',
            key: 'work_days',
            width: 100,
            render: (work_days) => (
                <Text>{formatNumberToCurrency(work_days) || '--'} ngày</Text>
            ),
        },
        {
            title: 'Lương cơ bản',
            dataIndex: 'salary_basic',
            key: 'salary_basic',
            width: 100,
            render: (salary_basic) => (
                <Text>{formatNumberToCurrency(salary_basic) || '--'} vnđ</Text>
            ),
        },
        {
            title: 'Ngày nghỉ lễ, phép',
            dataIndex: 'work_days_holiday',
            key: 'work_days_holiday',
            width: 100,
            render: (work_days_holiday) => (
                <Text>{formatNumberToCurrency(work_days_holiday) || '--'} ngày</Text>
            ),
        },
        {
            title: 'Giờ làm thêm',
            children: [
                {
                    title: 'Ngày thường',
                    dataIndex: 'bonus_hours',
                    key: 'bonus_hours',
                    width: 100,
                    render: (bonus_hours) => (
                        <Text>{formatNumberToCurrency(bonus_hours) || '--'} giờ</Text>
                    ),
                },
                {
                    title: 'Ngày lễ',
                    dataIndex: 'bonus_hours_holiday',
                    key: 'bonus_hours_holiday',
                    width: 100,
                    render: (bonus_hours_holiday) => (
                        <Text>{formatNumberToCurrency(bonus_hours_holiday) || '--'} giờ</Text>
                    ),
                },
            ],
        }, {
            title: 'Phụ cấp',
            dataIndex: 'allowance',
            key: 'allowance',
            width: 100,
            render: (allowance) => (
                <Text>{formatNumberToCurrency(allowance) || '--'} vnđ</Text>
            ),
        },
        {
            title: 'Tổng tiền làm thêm',
            dataIndex: 'salary_bonus',
            key: 'salary_bonus',
            width: 100,
            render: (salary_bonus) => (
                <Text>{formatNumberToCurrency(salary_bonus) || '--'}</Text>
            ),
        },
        {
            title: 'Khấu trừ',
            children: [
                {
                    title: 'BHXH',
                    dataIndex: 'insurance_social_rate',
                    key: 'insurance_social_rate',
                    width: 100,
                    render: (insurance_social_rate) => (
                        <Text>{formatNumberToCurrency(insurance_social_rate) || '--'} vnđ</Text>
                    ),
                },
                {
                    title: 'BHYT',
                    dataIndex: 'insurance_health_rate',
                    key: 'insurance_health_rate',
                    width: 100,
                    render: (insurance_health_rate) => (
                        <Text>{formatNumberToCurrency(insurance_health_rate) || '--'} vnđ</Text>
                    ),
                },
                {
                    title: 'BHTN',
                    dataIndex: 'insurance_unemployment_rate',
                    key: 'insurance_unemployment_rate',
                    width: 100,
                    render: (insurance_unemployment_rate) => (
                        <Text>{formatNumberToCurrency(insurance_unemployment_rate) || '--'} vnđ</Text>
                    ),
                },
            ],
        },
        {
            title: 'Khấu trừ TNCN',
            dataIndex: 'rate',
            key: 'rate',
            width: 100,
            render: (rate) => (
                <Text>{formatNumberToCurrency(rate) || '--'} vnđ</Text>
            ),
        },
        {
            title: 'Tạm ứng',
            children: [
                {
                    title: 'TK nợ 334',
                    dataIndex: 'price',
                    key: 'price',
                    width: 100,
                    render: (price) => (
                        <Text>{formatNumberToCurrency(price) || '--'} vnđ</Text>
                    ),
                },
                {
                    title: 'TK có 141',
                    dataIndex: 'price',
                    key: 'price',
                    width: 100,
                    render: (price) => (
                        <Text>{formatNumberToCurrency(price) || '--'} vnđ</Text>
                    ),
                },
            ]
        },
        {
            title: 'Thực lĩnh',
            dataIndex: 'salaryTotal',
            key: 'salaryTotal',
            width: 100,
            render: (salaryTotal) => (
                <Text>{formatNumberToCurrency(salaryTotal) || '--'}</Text>
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
                                onClick={() => setCurrentParoll(record)}
                            />
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    return (
        <React.Fragment>
            <Helmet titleTemplate="Tính lương - Admin" defaultTitle="Tính lương - Admin">
                <meta name="description" content="Tính lương - Admin" />
            </Helmet>

            {currentParoll &&
                <HtmlPrint
                    isShowPrint={!!currentParoll}
                    onHide={() => setCurrentParoll(null)}
                    data={dataPayroll}
                />
            }

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
                            loading={loadingPayroll}
                            style={{ background: '#1677ff' }}
                            onClick={() => {
                                form.validateFields()
                                    .then(async values => {
                                        const body = {
                                            month: Number(dayjs(values.plan_number).format('MM')),
                                            year: Number(dayjs(values.plan_number).format('YYYY')),
                                            staffId: values?.staffId
                                        }

                                        mutatePayroll(body);
                                    })
                            }}
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
                <Spin spinning={loadingPayroll}>
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
                                    name="staffId"
                                    label="Nhân viên"
                                    rules={[
                                        { required: true, message: 'Nhân viên không được để trống!' },
                                    ]}
                                >
                                    <Select
                                        className="input-item"
                                        placeholder="Chọn nhân viên"
                                        loading={isLoadingStaff}
                                        allowClear
                                    >
                                        {dataStaff?.staffs?.map((_option: any, index: number) => (
                                            <Option
                                                value={_option.id}
                                                key={`option-change-status-${index}`}
                                            >
                                                {_option?.name}
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
                    onClick={() => {
                        setShowPayroll(true);
                        form.resetFields();
                    }}
                >
                    Tính lương nhân viên
                </Button>
            </Row>
            <Space className='space-base' direction="vertical" size={30}>
                {dataPayroll?.length > 0 && (
                    <>
                        {Object.keys(_.groupBy(dataPayroll, 'date')).map((item, index) => (
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                bordered={false}
                                style={{ background: '#fff' }}
                            >
                                <Panel header={
                                    <Space className='space-base' style={{ justifyContent: 'space-between' }}>
                                        <Text strong>{`Lương tháng ${item}`}</Text>
                                    </Space>
                                } key="1">
                                    <TableCommon
                                        scroll={{ x: 2000 }}
                                        dataSource={_.groupBy(dataPayroll, 'date')[item] || []}
                                        loading={false}
                                        pagination={false}
                                        onChangePagination={() => { }}
                                        columns={columns}
                                    />
                                </Panel>
                            </Collapse>
                        ))}
                    </>
                )}
                {dataPayroll?.length == 0 && <div style={{ margin: '0px 40px', marginTop: '80px' }}>
                    <Empty description="Chưa có thông tin tính lương" />
                </div>}
            </Space>
        </React.Fragment>
    );
};

export default memo(Page);
