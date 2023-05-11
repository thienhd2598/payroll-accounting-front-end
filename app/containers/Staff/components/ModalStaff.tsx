import { Button, Checkbox, Col, Form, Input, Modal, Radio, Row, Space, Spin } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import CompanyService from 'services/Company/Company.service';
import { CreateCompanyRequest, UpdateCompanyRequest } from 'services/Company/Company.types';
import { showAlert } from 'utils/helper';
import { useMutation } from 'react-query';

interface IModalCompany {
    action: string,
    onHide: () => void,
    currentData: any,
    refetch: any
}

const ModalCompany = ({ action, onHide, currentData, refetch }: IModalCompany) => {
    const [form] = Form.useForm();
    const { isLoading: loadingCreateCompany, mutate: mutateCreateCompany, } = useMutation(
        (params: CreateCompanyRequest) => {
            return CompanyService.createCompany(params);
        }, {
        onSuccess: (res) => {
            if (res.status === 200) {
                showAlert.success('Tạo nhân viên thành công');
                refetch();
                onHide();
            } else {
                showAlert.error(res.message || 'Đã có lỗi xảy ra, vui lòng thử lại')
            }            
        },
        onError: (err: Error) => {
            showAlert.error(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
        },
    }
    );

    const { isLoading: loadingEditCompany, mutate: mutateEditCompany, } = useMutation(
        (params: UpdateCompanyRequest) => {
            return CompanyService.updateCompany(params);
        }, {
        onSuccess: (res) => {
            if (res.status === 200) {
                showAlert.success('Cập nhật nhân viên thành công');                
                refetch();
                onHide();
            } else {
                showAlert.error(res.message || 'Đã có lỗi xảy ra, vui lòng thử lại')
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

            const { name, tax_code, deputy, position, address, phone, telephone, fax, account_number, bank, description } = currentData || {};
            form.setFieldsValue({
                name, tax_code, deputy, position, address, phone, telephone, fax, account_number, bank, description
            });
        }, [currentData]
    );

    const onConfirm = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        if (action == 'create') {
                            mutateCreateCompany({ ...values });
                        } else {
                            mutateEditCompany({
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
            title={action === 'create' ? 'Tạo mới nhân viên' : 'Cập nhật thông tin nhân viên'}
            open={!!action}
            keyboard={true}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
            style={{ top: 50 }}
            width={800}
            onCancel={onHide}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={loadingCreateCompany || loadingEditCompany}
                        onClick={onConfirm}
                        style={{ background: '#1677ff' }}
                    >
                        {action === 'create' ? 'Xác nhận' : 'Cập nhật'}
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        disabled={loadingCreateCompany || loadingEditCompany}
                        onClick={onHide}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>,
            ]}
        >
            <Spin spinning={loadingCreateCompany || loadingEditCompany}>
                <Form
                    form={form}
                    name="basic"
                    style={{ marginTop: 20 }}
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên công ty"
                                rules={[
                                    { required: true, message: 'Tên công ty không được để trống!' },
                                ]}
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Tên công ty"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tax_code"
                                label="Mã số thuế"
                                rules={[
                                    { required: true, message: 'Mã số thuế không được để trống!' },
                                ]}
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Mã số thuế"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="deputy"
                                label="Người đại diện pháp luật"
                                rules={[
                                    { required: true, message: 'Người đại diện pháp luật không được để trống!' },
                                ]}
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Người đại diện pháp luật"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="position"
                                label="Chức vụ"
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Chức vụ"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Địa chỉ"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Số điện thoại"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="telephone"
                                label="Di động"
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Di động"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="fax"
                                label="Fax"
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Fax"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="account_number"
                                label="Tài khoản số"
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Tài khoản số"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="bank"
                                label="Ngân hàng"
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Ngân hàng"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="description"
                                label="Mô tả"
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Mô tả"
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

export default memo(ModalCompany);