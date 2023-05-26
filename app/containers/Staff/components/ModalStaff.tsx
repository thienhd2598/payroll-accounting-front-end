import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Spin } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import { showAlert } from 'utils/helper';
import { useMutation, useQuery } from 'react-query';
import StaffService from "services/Staff/Staff.service";
import DepartmentService from "services/Department/Department.service";
import PositionService from "services/Position/Position.service";
import IncomeTaxService from "services/IncomeTax/IncomeTax.service";
import moment from 'moment';
import dayjs from 'dayjs';

interface IModalStaff {
    action: string,
    onHide: () => void,
    currentData: any,
    refetch: any
}

const { Option } = Select;

const ModalStaff = ({ action, onHide, currentData, refetch }: IModalStaff) => {
    const [form] = Form.useForm();

    const { isLoading: loadingCreateStaff, mutate: mutateCreateStaff, } = useMutation(
        (params: any) => {            
            return StaffService.createStaff(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Tạo nhân viên thành công');
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

    const { isLoading: loadingEditStaff, mutate: mutateEditStaff, } = useMutation(
        (params: any) => {
            return StaffService.updateStaff(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Cập nhật nhân viên thành công');
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

    const { isLoading: loadingOptions, data } = useQuery(
        'GET_LIST_OPTIONS_FOR_STAFF',
        async () => {
            const { data: dataDepartment } = await DepartmentService.getAllDepartment();
            const { data: dataPosition } = await PositionService.getAllPosition();
            const { data: dataIncomeTax } = await IncomeTaxService.getAllIncomeTax();

            return { dataDepartment, dataPosition, dataIncomeTax };
        }, {
        staleTime: 10 * (60 * 1000),
    });

    const { optionsDepartment, optionsPosition, optionsIncomeTax } = useMemo(
        () => {
            const { dataDepartment, dataIncomeTax, dataPosition } = data || {};

            return {
                optionsDepartment: dataDepartment
                    ?.departments
                    ?.map(_department => ({ name: _department?.name, value: _department?.id })),
                optionsPosition: dataPosition
                    ?.positions
                    ?.map(_position => ({ name: _position?.name, value: _position?.id })),
                optionsIncomeTax: dataIncomeTax
                    ?.incomeTaxs
                    ?.map(_incomeTax => ({ name: _incomeTax?.name, value: _incomeTax?.id })),

            }
        }, [data]
    );

    useMemo(
        () => {
            if (!currentData) {
                form.resetFields();
                return;
            };

            const { name, phone, birthday, address, date_from, tax_code, department, position, income_tax } = currentData || {};
            form.setFieldsValue({
                name, phone, address, tax_code, departmentId: department?.id, positionId: position?.id, incomeTaxId: income_tax?.id, 
                birthday: moment(dayjs.unix(birthday).format('YYYY-MM-DD')),
                date_from: moment(dayjs.unix(date_from).format('YYYY-MM-DD')),
            });
        }, [currentData]
    );

    const onConfirm = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        console.log({ values });                        

                        if (action == 'create') {
                            mutateCreateStaff({ 
                                ...values,
                                birthday: String(moment(values?.birthday).unix()),
                                date_from: String(moment(values?.date_from).unix()),
                            });
                        } else {
                            mutateEditStaff({
                                id: currentData?.id,
                                ...values,
                                birthday: String(moment(values?.birthday).unix()),
                                date_from: String(moment(values?.date_from).unix()),
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
            style={{ top: 150 }}
            width={600}
            onCancel={onHide}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={loadingCreateStaff || loadingEditStaff}
                        onClick={onConfirm}
                        style={{ background: '#1677ff' }}
                    >
                        {action === 'create' ? 'Xác nhận' : 'Cập nhật'}
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        disabled={loadingCreateStaff || loadingEditStaff}
                        onClick={onHide}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>,
            ]}
        >
            <Spin spinning={loadingCreateStaff || loadingEditStaff}>
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
                                name="positionId"
                                label="Chức vụ"
                                rules={[
                                    { required: true, message: 'Chức vụ không được để trống!' },
                                ]}
                            >
                                <Select
                                    className="input-item"
                                    placeholder="Chọn chức vụ nhân viên"
                                    loading={loadingOptions}
                                    allowClear
                                >
                                    {optionsPosition?.map((_option: any, index: number) => (
                                        <Option
                                            value={_option.value}
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
                                name="departmentId"
                                label="Phòng ban"
                                rules={[
                                    { required: true, message: 'Phòng ban không được để trống!' },
                                ]}
                            >
                                <Select
                                    className="input-item"
                                    placeholder="Chọn phòng ban nhân viên"
                                    loading={loadingOptions}
                                    allowClear
                                >
                                    {optionsDepartment?.map((_option: any, index: number) => (
                                        <Option
                                            value={_option.value}
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
                                name="incomeTaxId"
                                label="Cấp bậc thuế"
                                rules={[
                                    { required: true, message: 'Cấp bậc thuế không được để trống!' },
                                ]}
                            >
                                <Select
                                    className="input-item"
                                    placeholder="Chọn cấp bậc thuế nhân viên"
                                    loading={loadingOptions}
                                    allowClear
                                >
                                    {optionsIncomeTax?.map((_option: any, index: number) => (
                                        <Option
                                            value={_option.value}
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
                                name="tax_code"
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
                                name="date_from"
                                label="Ngày vào làm"
                            >
                                <DatePicker
                                    className="input-item"
                                    placeholder="Ngày vào làm"
                                    format='DD-MM-YYYY'
                                    allowClear
                                    />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="birthday"
                                label="Sinh nhật"
                                >
                                <DatePicker
                                    className="input-item"
                                    format='DD-MM-YYYY'
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

export default memo(ModalStaff);
