import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Radio, Row, Space, Spin } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import { showAlert } from 'utils/helper';
import { useMutation } from 'react-query';
import DepartmentService from "services/Department/Department.service";

interface IModalDepartment {
    action: string,
    onHide: () => void,
    currentData: any,
    refetch: any
}

const ModalDepartment = ({ action, onHide, currentData, refetch }: IModalDepartment) => {
    const [form] = Form.useForm();
    const { isLoading: loadingCreateDepartment, mutate: mutateCreateDepartment, } = useMutation(
        (params: any) => {
            return DepartmentService.createDepartment(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Tạo phòng ban thành công');
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

    const { isLoading: loadingEditDepartment, mutate: mutateEditDepartment, } = useMutation(
        (params: any) => {
            return DepartmentService.updateDepartment(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Cập nhật phòng ban thành công');
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

            const { name, phone } = currentData || {};
            form.setFieldsValue({
                name, phone
            });
        }, [currentData]
    );

    const onConfirm = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        if (action == 'create') {
                            mutateCreateDepartment({ ...values });
                        } else {
                            mutateEditDepartment({
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
            title={action === 'create' ? 'Tạo mới phòng ban' : 'Cập nhật thông tin phòng ban'}
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
                        loading={loadingCreateDepartment || loadingEditDepartment}
                        onClick={onConfirm}
                        style={{ background: '#1677ff' }}
                    >
                        {action === 'create' ? 'Xác nhận' : 'Cập nhật'}
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        disabled={loadingCreateDepartment || loadingEditDepartment}
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
            <Spin spinning={loadingCreateDepartment || loadingEditDepartment}>
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
                                label="Tên phòng ban"
                                rules={[
                                    { required: true, message: 'Tên phòng ban không được để trống!' },
                                ]}
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Nhập tên phòng ban"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    { required: true, message: 'Số điện thoại không được để trống!' },
                                ]}
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Nhập số điện thoại"
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

export default memo(ModalDepartment);