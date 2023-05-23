import { Button, Checkbox, Col, Form, Input, Modal, Radio, Row, Space, Spin, Select, DatePicker } from "antd";
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

const { Option } = Select;

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
                                name="position"
                                label="Tên nhân viên"
                                required
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Tên nhân viên"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Chức vụ"
                                rules={[
                                    { required: true, message: 'Chức vụ không được để trống!' },
                                ]}
                            >
                                <Select
                                    className="input-item"
                                    placeholder="Chọn chức vụ nhân viên"
                                    allowClear
                                >
                                    {[
                                        { title: 'Giám đốc', id: 1 },
                                        { title: 'Phó giám đốc', id: 2 },
                                        { title: 'Giám đốc công nghệ', id: 3 },
                                        { title: 'Kế toán trưởng', id: 4 },
                                        { title: 'Trưởng nhóm', id: 5 },
                                        { title: 'Nhân viên', id: 6 },
                                    ]?.map((_document: any, index: number) => (
                                        <Option value={_document.id} key={`document-change-status-${index}`}>
                                            {_document?.title}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tax_code"
                                label="Phòng ban"
                                rules={[
                                    { required: true, message: 'Phòng ban không được để trống!' },
                                ]}
                            >
                                <Select
                                    className="input-item"
                                    placeholder="Chọn phòng ban nhân viên"
                                    allowClear
                                >
                                    {[
                                        { id: 1, name: 'Công nghệ' },
                                        { id: 2, name: 'Vận hành' },
                                        { id: 3, name: 'Kế toán' },
                                        { id: 4, name: 'Grow 1' },
                                        { id: 5, name: 'Grow 2' },
                                        { id: 6, name: 'Grow 3' },
                                        { id: 7, name: 'Hành chính nhân sự' },
                                        { id: 8, name: 'Media' },
                                        { id: 9, name: 'Marketing' },
                                    ]?.map((_document: any, index: number) => (
                                        <Option value={_document.id} key={`document-change-status-${index}`}>
                                            {_document?.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="position"
                                label="Cấp bậc thuế"
                                required
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Cấp bậc thuế"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="fax"
                                label="Mã số thuế"
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
                                name="description"
                                label="Sinh nhật"
                            >
                                <DatePicker
                                    className="input-item"
                                    placeholder="Sinh nhật"
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