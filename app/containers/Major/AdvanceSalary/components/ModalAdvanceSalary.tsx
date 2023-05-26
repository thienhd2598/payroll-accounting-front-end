import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Spin, Typography } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import { showAlert } from 'utils/helper';
import { useMutation, useQuery } from 'react-query';
import AdvanceSalaryService from "services/AdvancedSalary/AdvanceSalary.service";
import StaffService from "services/Staff/Staff.service";

interface IModalAdvanceSalary {
    action: string,
    onHide: () => void,
    currentData: any,
    refetch: any
}

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ModalAdvanceSalary = ({ action, onHide, currentData, refetch }: IModalAdvanceSalary) => {
    const [form] = Form.useForm();

    const { isLoading, data } = useQuery(
        'GET_LIST_STAFF',
        async () => {
            const response = await StaffService.getAllStaff();

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });


    const { isLoading: loadingCreateAdvanceSalary, mutate: mutateCreateAdvanceSalary, } = useMutation(
        (params: any) => {
            return AdvanceSalaryService.createAdvanceSalary(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Tạo thông tin tạm ứng lương thành công');
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

    const { isLoading: loadingEditAdvanceSalary, mutate: mutateEditAdvanceSalary, } = useMutation(
        (params: any) => {
            return AdvanceSalaryService.updateAdvanceSalary(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Cập nhật thông tin tạm ứng lương thành công');
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

            const { name, price, note, staff } = currentData || {};
            form.setFieldsValue({
                name, price, note, staffId: staff?.id
            });
        }, [currentData]
    );

    const onConfirm = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        if (action == 'create') {
                            mutateCreateAdvanceSalary({
                                ...values,
                                price: Number(values?.price)
                            });
                        } else {
                            mutateEditAdvanceSalary({
                                id: currentData?.id,
                                ...values,
                                price: Number(values?.price)
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
            title={action === 'create' ? 'Tạo mới thông tin tạm ứng lương' : 'Cập nhật thông tin thông tin tạm ứng lương'}
            open={!!action}
            keyboard={true}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
            style={{ top: 120 }}
            width={600}
            onCancel={onHide}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={loadingCreateAdvanceSalary || loadingEditAdvanceSalary}
                        onClick={onConfirm}
                        style={{ background: '#1677ff' }}
                    >
                        {action === 'create' ? 'Xác nhận' : 'Cập nhật'}
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        disabled={loadingCreateAdvanceSalary || loadingEditAdvanceSalary}
                        onClick={onHide}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>,
            ]}
        >
            <Spin spinning={loadingCreateAdvanceSalary || loadingEditAdvanceSalary}>
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
                                label="Tên mẫu ứng lương"
                                rules={[
                                    { required: true, message: 'Tên mẫu ứng lương không được để trống!' },
                                ]}
                            >
                                <Input
                                    className="input-item"
                                    placeholder="Tên mẫu ứng lương"
                                    allowClear
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
                                    loading={isLoading}
                                    allowClear
                                >
                                    {data?.staffs?.map((_option: any, index: number) => (
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
                        <Col span={24}>
                            <Form.Item
                                name="price"
                                label="Số tiền tạm ứng"
                                rules={[
                                    { required: true, message: 'Số tiền tạm ứng không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Số tiền tạm ứng"
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
                        <Col span={12}>
                            <Text>Tài khoản nợ: <strong>331</strong></Text>
                        </Col>
                        <Col span={12}>
                            <Text>Tài khoản có: <strong>113</strong></Text>
                        </Col>
                        <Col span={24} style={{ marginTop: 20 }}>
                            <Form.Item
                                name="note"
                                label="Lý do"
                                rules={[
                                    { required: true, message: 'Lý do không được để trống!' },
                                ]}
                            >
                                <TextArea
                                    className="input-item"
                                    placeholder="Lý do"
                                    rows={5}
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

export default memo(ModalAdvanceSalary);
