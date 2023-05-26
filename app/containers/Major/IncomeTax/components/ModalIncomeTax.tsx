import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Radio, Row, Space, Spin } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import { showAlert } from 'utils/helper';
import { useMutation } from 'react-query';
import IncomeTaxService from "services/IncomeTax/IncomeTax.service";

interface IModalIncomeTax {
    action: string,
    onHide: () => void,
    currentData: any,
    refetch: any
}

const ModalIncomeTax = ({ action, onHide, currentData, refetch }: IModalIncomeTax) => {
    const [form] = Form.useForm();
    const { isLoading: loadingCreateIncomeTax, mutate: mutateCreateIncomeTax, } = useMutation(
        (params: any) => {
            return IncomeTaxService.createIncomeTax(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Tạo cấp bậc thuế thành công');
                refetch();
                onHide();
                form.resetFields();
            } else {
                showAlert.error(res?.message || 'Đã có lỗi xảy ra, vui lòng thử lại')
            }
        },
        onError: (err: Error) => {
            showAlert.error(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
        },
    }
    );

    const { isLoading: loadingEditIncomeTax, mutate: mutateEditIncomeTax, } = useMutation(
        (params: any) => {
            return IncomeTaxService.updateIncomeTax(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Cập nhật cấp bậc thuế thành công');
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

            const { name, rate } = currentData || {};
            form.setFieldsValue({
                name, rate
            });
        }, [currentData]
    );

    const onConfirm = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        if (action == 'create') {
                            mutateCreateIncomeTax({ ...values, rate: String(values?.rate) });
                        } else {
                            mutateEditIncomeTax({
                                id: currentData?.id,
                                ...values,
                                rate: String(values?.rate)
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
            title={action === 'create' ? 'Tạo mới cấp bậc thuế' : 'Cập nhật thông tin cấp bậc thuế'}
            open={!!action}
            keyboard={true}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
            style={{ top: 150 }}
            width={600}
            onCancel={onHide}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={loadingCreateIncomeTax || loadingEditIncomeTax}
                        onClick={onConfirm}
                        style={{ background: '#1677ff' }}
                    >
                        {action === 'create' ? 'Xác nhận' : 'Cập nhật'}
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        disabled={loadingCreateIncomeTax || loadingEditIncomeTax}
                        onClick={onHide}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>,
            ]}
        >
            <Spin spinning={loadingCreateIncomeTax || loadingEditIncomeTax}>
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
                                label="Tên cấp bậc thuế"
                                rules={[
                                    { required: true, message: 'Tên cấp bậc thuế không được để trống!' },
                                ]}
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Nhập tên cấp bậc thuế"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="rate"
                                label="Thuế suất"
                                rules={[
                                    { required: true, message: 'Thuế suất không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Thuế suất"
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

export default memo(ModalIncomeTax);