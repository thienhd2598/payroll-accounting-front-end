import { memo, useMemo, useCallback, useState, Fragment } from 'react';
import { Badge, Button, Card, Col, DatePicker, Form, Grid, Input, Modal, Row, Space, Spin, Tabs, Typography } from "antd";
import BriefService from 'services/Brief/Brief.service';
import { useMutation } from 'react-query';
import { EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface DocumentPlanProps {
    dataPlan: {
        brief_number?: number,
        plan_number?: string;
        plan_datetime?: string;
        archive_number?: string;
        archive_datetime?: string;
        deadline?: string;
    } | null,
    status: string
};

const DocumentPlanModal = ({
    dataPlan
}: DocumentPlanProps) => {
    const [formPlan] = Form.useForm();
    const [openPlan, setOpenPlan] = useState<boolean>(false);

    useMemo(
        () => {
            if (!dataPlan && !openPlan) return;
            let {
                plan_number,
                plan_datetime,
                archive_number,
                archive_datetime,
                deadline,
            } = dataPlan || {};
            formPlan.setFieldsValue({
                plan_number,
                plan_datetime,
                archive_number,
                archive_datetime,
                deadline,
            })
        }, [dataPlan, openPlan]
    );

    const onUpdatePlanBrief = useCallback(
        () => {
            formPlan.validateFields()
                .then(values => console.log({ values }));
        }, []
    );

    return (
        <Fragment>
            <Modal
                title={'Cập nhật số kế hoạch và công văn'}
                open={openPlan}
                keyboard={true}
                bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
                style={{ top: 150 }}
                width={600}
                onCancel={() => {
                    setOpenPlan(false);
                }}
                footer={[
                    <Space size={20}>
                        <Button
                            type="primary"
                            className="btn-base"
                            loading={false}
                            onClick={onUpdatePlanBrief}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            type="primary"
                            className="btn-base"
                            danger
                            onClick={() => {
                                formPlan.resetFields();
                                setOpenPlan(false);
                            }}
                        >
                            Huỷ
                        </Button>
                    </Space>,
                ]}
            >
                <Spin spinning={false}>
                    <Form
                        form={formPlan}
                        name="basic"
                        style={{ marginTop: 20 }}
                        layout="vertical"
                        initialValues={{ remember: true }}
                    >
                        <Row gutter={30}>
                            <Col span={12}>
                                <Form.Item
                                    label={<Text>Số kế hoạch của TT:</Text>}
                                    name="plan_number"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject('Số kế hoạch của TT không được để trống'),
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Số kế hoạch của TT"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<Text>Số công văn:</Text>}
                                    name="archive_number"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject('Số công văn không được để trống'),
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Số công văn"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<Text>Ngày tháng kế hoạch:</Text>}
                                    name="plan_datetime"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject('Ngày tháng kế hoạch không được để trống'),
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Ngày tháng kế hoạch"
                                        className='input-item'
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<Text>Ngày tháng công văn:</Text>}
                                    name="archive_datetime"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject('Ngày tháng công văn không được để trống'),
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Ngày tháng công văn"
                                        className='input-item'
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<Text>Ngày tháng kết thúc:</Text>}
                                    name="deadline"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject('Ngày tháng kết thúc không được để trống'),
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Ngày tháng kết thúc"
                                        className='input-item'
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Modal>

            <Space direction="vertical" size={20} className="space-base">
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        type="primary"
                        icon={<EditOutlined className="icon-base" />}
                        onClick={() => setOpenPlan(true)}
                    >
                        Cập nhật
                    </Button>
                </div>
                <Row gutter={[30, 30]}>
                    <Col span={12}>
                        <Row>
                            <Text className='txt-right' strong>Số kế hoạch của TT:</Text>
                            <Text>{dataPlan?.plan_number || '--'}</Text>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Text className='txt-right' strong>Ngày tháng kế hoạch:</Text>
                            <Text>{dataPlan?.plan_datetime || '--'}</Text>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Text className='txt-right' strong>Số công văn:</Text>
                            <Text>{dataPlan?.archive_number || '--'}</Text>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Text className='txt-right' strong>Ngày tháng công văn:</Text>
                            <Text>{dataPlan?.archive_datetime || '--'}</Text>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Text className='txt-right' strong>Ngày tháng kết thúc:</Text>
                            <Text>{dataPlan?.deadline || '--'}</Text>
                        </Row>
                    </Col>
                </Row>
            </Space>
        </Fragment>
    )
};

export default memo(DocumentPlanModal);
