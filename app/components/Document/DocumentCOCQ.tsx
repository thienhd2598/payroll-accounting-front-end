import { Card, Typography, Form, Spin, Row, Col, Input, Button, Space } from 'antd';
import { memo, useCallback, useState } from 'react';
import { showAlert } from 'utils/helper';

const { Text } = Typography;

const DocuemntCOCQ = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const onConfirm = useCallback(
        () => {
            form.validateFields()
                .then(values => {
                    console.log({ values });
                    setLoading(true);
                    setTimeout(() => {
                        showAlert.success('Cập nhật CO, CQ thành công')
                        setLoading(false);
                    }, 1500)
                })
        }, []
    );

    return (
        <Card
            title="Thông tin CO, CQ"
            style={{ marginBottom: 24 }}
            bordered={false}
            loading={false}
        >
            <Spin spinning={loading}>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    style={{ marginTop: 20 }}
                    initialValues={{ remember: true }}
                >
                    <Row gutter={30}>
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <Space direction="vertical" size={0}>
                                        <Text>CO</Text>
                                        <Text type="danger" italic style={{ fontSize: 12 }}>Trường hợp có nhiều CO, mỗi CO cách nhau bởi dấu phẩy (,)</Text>
                                    </Space>
                                }
                                name="co"
                            >
                                <Input
                                    className='input-item'
                                    placeholder="Nhập CO"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <Space direction="vertical" size={0}>
                                        <Text>CQ</Text>
                                        <Text type="danger" italic style={{ fontSize: 12 }}>Trường hợp có nhiều CQ, mỗi CQ cách nhau bởi dấu phẩy (,)</Text>
                                    </Space>
                                }
                                name="cq"
                            >
                                <Input
                                    className='input-item'
                                    placeholder="Nhập CQ"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Button
                            className='btn-base'
                            type="primary"
                            onClick={onConfirm}
                            loading={loading}
                        >
                            Cập nhật
                        </Button>
                    </Row>
                </Form>
            </Spin>
        </Card>
    )
};

export default memo(DocuemntCOCQ);