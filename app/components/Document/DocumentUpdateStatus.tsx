import { memo, useMemo } from 'react';
import { Modal, Typography, Form, Spin, Button, Space, Row, Col, Select } from 'antd';
import { useMutation } from 'react-query';
import BriefService from "services/Brief/Brief.service";
import { DocumentStatus } from './DocumentStatus';
import TextArea from 'antd/es/input/TextArea';

const { Text } = Typography;
const { Option } = Select;

interface DocumentUpdateStatusProps {
    show: boolean,
    onHide: () => void,
    status: string | undefined
}

const DocumentUpdateStatus = ({ show, onHide, status }: DocumentUpdateStatusProps) => {
    const [form] = Form.useForm();

    useMemo(
        () => {
            if (!!status && !!show)
                form.setFieldValue('status', Number(status));
        }, [status, show]
    )

    return (
        <Modal
            title="Đổi trạng thái hồ sơ"
            open={show}
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
                                label="Trạng thái hồ sơ"
                                name="status"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(`Trạng thái hồ sơ không được để trống`),
                                    },
                                ]}
                            >
                                <Select
                                    className="input-item"
                                    placeholder="Chọn trạng thái hồ sơ"
                                    allowClear
                                >
                                    {DocumentStatus?.map((_document: any, index: number) => (
                                        <Option value={_document.code} key={`document-change-status-${index}`}>
                                            {_document?.title}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Ghi chú"
                                name="note"
                            >
                                <TextArea
                                    rows={4}
                                    maxLength={5000}
                                    showCount
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Modal>
    )
};

export default memo(DocumentUpdateStatus);