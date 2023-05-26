import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Spin } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import { showAlert } from 'utils/helper';
import { useMutation, useQuery } from 'react-query';
import SalaryInformationService from "services/SalaryInformation/SalaryInformation.service";
import StaffService from "services/Staff/Staff.service";

interface IModalSalaryInformation {
    action: string,
    onHide: () => void,
    currentData: any,
    refetch: any
}

const { Option } = Select;

const ModalSalaryInformation = ({ action, onHide, currentData, refetch }: IModalSalaryInformation) => {
    const [form] = Form.useForm();

    const { isLoading, data } = useQuery(
        'GET_LIST_STAFF',
        async () => {
            const response = await StaffService.getAllStaff();

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });
    

    const { isLoading: loadingCreateSalaryInformation, mutate: mutateCreateSalaryInformation, } = useMutation(
        (params: any) => {
            return SalaryInformationService.createSalaryInformation(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Tạo tham số lương thành công');
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

    const { isLoading: loadingEditSalaryInformation, mutate: mutateEditSalaryInformation, } = useMutation(
        (params: any) => {
            return SalaryInformationService.updateSalaryInformation(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Cập nhật tham số lương thành công');
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

            const { salary_basic, work_day_standard, work_hours_standard, insurance_health_rate, insurance_social_rate, insurance_unemployment_rate, staff } = currentData || {};
            form.setFieldsValue({
                salary_basic, work_day_standard, work_hours_standard, insurance_health_rate, insurance_social_rate, insurance_unemployment_rate, staffId: staff?.id
            });
        }, [currentData]
    );

    const onConfirm = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        const body = {
                            salary_basic: Number(values?.salary_basic), 
                            work_day_standard: Number(values?.work_day_standard), 
                            work_hours_standard: Number(values?.work_hours_standard), 
                            insurance_health_rate: Number(values?.insurance_health_rate), 
                            insurance_social_rate: Number(values?.insurance_social_rate), 
                            insurance_unemployment_rate: Number(values?.insurance_unemployment_rate),
                        };

                        if (action == 'create') {
                            mutateCreateSalaryInformation({ 
                                ...values,
                                ...body 
                             });
                        } else {
                            mutateEditSalaryInformation({
                                id: currentData?.id,
                                ...values,                                
                                ...body
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
            title={action === 'create' ? 'Tạo mới tham số lương' : 'Cập nhật thông tin tham số lương'}
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
                        loading={loadingCreateSalaryInformation || loadingEditSalaryInformation}
                        onClick={onConfirm}
                        style={{ background: '#1677ff' }}
                    >
                        {action === 'create' ? 'Xác nhận' : 'Cập nhật'}
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        disabled={loadingCreateSalaryInformation || loadingEditSalaryInformation}
                        onClick={onHide}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>,
            ]}
        >
            <Spin spinning={loadingCreateSalaryInformation || loadingEditSalaryInformation}>
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
                        <Col span={12}>
                            <Form.Item
                                name="salary_basic"
                                label="Lương cơ bản"
                                rules={[
                                    { required: true, message: 'Lương cơ bản không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Lương cơ bản"
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
                            <Form.Item
                                name="work_hours_standard"
                                label="Giờ công chuẩn"
                                rules={[
                                    { required: true, message: 'Giờ công chuẩn không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Giờ công chuẩn"
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
                            <Form.Item
                                name="work_day_standard"
                                label="Ngày công chuẩn"
                                rules={[
                                    { required: true, message: 'Ngày công chuẩn không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Ngày công chuẩn"
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
                            <Form.Item
                                name="insurance_social_rate"
                                label="Tỉ lệ bảo hiểm xã hội"
                                rules={[
                                    { required: true, message: 'Tỉ lệ bảo hiểm xã hội không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Tỉ lệ bảo hiểm xã hội"
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
                            <Form.Item
                                name="insurance_health_rate"
                                label="Tỉ lệ bảo hiểm y tế"
                                rules={[
                                    { required: true, message: 'Tỉ lệ bảo hiểm y tế không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Tỉ lệ bảo hiểm y tế"
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
                            <Form.Item
                                name="insurance_unemployment_rate"
                                label="Tỉ lệ bảo hiểm thất nghiệp"
                                rules={[
                                    { required: true, message: 'Tỉ lệ bảo hiểm thất nghiệp không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Tỉ lệ bảo hiểm thất nghiệp"
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

export default memo(ModalSalaryInformation);


