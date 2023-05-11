import { memo, useMemo } from 'react';
import { Modal, Typography, Form, Spin, Button, Space, Row, Col, Select, Input, DatePicker } from 'antd';

interface DocumentVisibleModalProps {
    action: string | null,    
    onHide: () => void,
}

const DocumentVisibleModal = ({    
    onHide,
    action
}: DocumentVisibleModalProps) => {
    const [form] = Form.useForm();

    useMemo(() => {
        if (!action) form.resetFields()
    }, [action]);

    return (
        <Modal
            title={action == 'open' ? 'Mở hồ sơ' : 'Đóng hồ sơ'}
            open={!!action}
            keyboard={true}
            bodyStyle={{ marginTop: 20 }}
            style={{ top: 150 }}
            width={700}
            onCancel={onHide}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={false}
                        onClick={() => {
                        }}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        onClick={onHide}
                    >
                        Đóng
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
                    <Row gutter={30}>
                        <Col span={24}>
                            <Form.Item
                                label="Số công văn"
                                name="name"
                            >
                                <Input
                                    className='input-item'
                                    placeholder="Nhập số công văn"
                                    disabled={action == 'open'}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Ngày tạm đóng"
                                name="date-close"
                            >
                                <DatePicker
                                    className='input-item'
                                    placeholder="Nhập ngày tạm đóng"
                                    disabled={action == 'open'}
                                    format="DD/MM/YYYY"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        {action == 'open' && <Col span={24}>
                            <Form.Item
                                label="Ngày mở"
                                name="date-open"
                            >
                                <DatePicker
                                    className='input-item'
                                    placeholder="Nhập ngày mở"                                    
                                    format="DD/MM/YYYY"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>}
                    </Row>
                </Form>
            </Spin>
        </Modal>
    )
};

export default memo(DocumentVisibleModal);