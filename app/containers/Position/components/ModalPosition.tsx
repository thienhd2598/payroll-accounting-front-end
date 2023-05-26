import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Radio, Row, Space, Spin } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import { showAlert } from 'utils/helper';
import { useMutation } from 'react-query';
import PositionService from "services/Position/Position.service";

interface IModalPosition {
    action: string,
    onHide: () => void,
    currentData: any,
    refetch: any
}

const ModalPosition = ({ action, onHide, currentData, refetch }: IModalPosition) => {
    const [form] = Form.useForm();
    const { isLoading: loadingCreatePosition, mutate: mutateCreatePosition, } = useMutation(
        (params: any) => {
            return PositionService.createPosition(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Tạo chức vụ thành công');
                refetch();
                onHide();
            } else {
                showAlert.error(res?.message || 'Đã có lỗi xảy ra, vui lòng thử lại')
            }
        },
        onError: (err: Error) => {
            showAlert.error(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
        },
    }
    );

    const { isLoading: loadingEditPosition, mutate: mutateEditPosition, } = useMutation(
        (params: any) => {
            return PositionService.updatePosition(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Cập nhật chức vụ thành công');
                refetch();
                onHide();
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

    useMemo(
        () => {
            if (!currentData) {
                form.resetFields();
                return;
            };

            const { name, allowance } = currentData || {};
            form.setFieldsValue({
                name, allowance
            });
        }, [currentData]
    );

    const onConfirm = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        if (action == 'create') {
                            mutateCreatePosition({ ...values });
                        } else {
                            mutateEditPosition({
                                id: currentData?.id,
                                ...values
                            })
                        }
                    })
            } catch (err) {
                showAlert.error(err || 'Đã có lỗi xảy ra, vui lòng thử lại');
            }
        }, [action, currentData]
    );

    return (
        <Modal
            title={action === 'create' ? 'Tạo mới chức vụ' : 'Cập nhật thông tin chức vụ'}
            open={!!action}
            keyboard={true}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
            style={{ top: 150 }}
            width={600}
            onCancel={() => {
                onHide();
                form.resetFields();
            }}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={loadingCreatePosition || loadingEditPosition}
                        onClick={onConfirm}
                        style={{ background: '#1677ff' }}
                    >
                        {action === 'create' ? 'Xác nhận' : 'Cập nhật'}
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        disabled={loadingCreatePosition || loadingEditPosition}
                        onClick={() => {
                            onHide();
                            form.resetFields();
                        }}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>,
            ]}
        >
            <Spin spinning={loadingCreatePosition || loadingEditPosition}>
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
                                label="Tên chức vụ"
                                rules={[
                                    { required: true, message: 'Tên chức vụ không được để trống!' },
                                ]}
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Nhập tên chức vụ"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="allowance"
                                label="Phụ cấp chức vụ"
                                rules={[
                                    { required: true, message: 'Phụ cấp chức vụ không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Phụ cấp chức vụ"
                                    style={{ width: '100%' }}
                                    min={0}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}                                    
                                    onKeyPress={evt => {
                                        var iKeyCode = evt.which ? evt.which : evt.keyCode;
                                        return (
                                            ((iKeyCode !== 8 && iKeyCode !== 46 && iKeyCode !== 45 && iKeyCode < 48) ||
                                                (iKeyCode > 57 &&
                                                    iKeyCode !== 189 &&
                                                    iKeyCode !== 68 &&
                                                    iKeyCode !== 69)) &&
                                            evt.preventDefault()
                                        );
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Modal>
    )
};

export default memo(ModalPosition);