import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Spin, Typography } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import { showAlert } from 'utils/helper';
import { useMutation, useQuery } from 'react-query';
import TimeKeepingService from "services/TimeKeeping/TimeKeeping.service";
import StaffService from "services/Staff/Staff.service";
import dayjs from "dayjs";

interface IModalTimeKeeping {
    action: string,
    onHide: () => void,
    currentData: any,
    refetch: any
}

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ModalTimeKeeping = ({ action, onHide, currentData, refetch }: IModalTimeKeeping) => {
    const [form] = Form.useForm();

    const { isLoading, data } = useQuery(
        'GET_LIST_STAFF',
        async () => {
            const response = await StaffService.getAllStaff();

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });    

    const { isLoading: loadingCreateTimeKeeping, mutate: mutateCreateTimeKeeping, } = useMutation(
        (params: any) => {
            return TimeKeepingService.createTimeKeeping(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Tạo thông tin chấm công thành công');
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

    const { isLoading: loadingEditTimeKeeping, mutate: mutateEditTimeKeeping, } = useMutation(
        (params: any) => {
            return TimeKeepingService.updateTimeKeeping(params);
        }, {
        onSuccess: (res: any) => {
            if (res.statusCode === 200) {
                showAlert.success('Cập nhật thông tin chấm công thành công');
                refetch();
                form.resetFields();
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
                        const body = {
                            month: Number(dayjs(values.date).format('MM')),
                            year: Number(dayjs(values.date).format('YYYY')),
                            work_days: Number(values?.work_days),
                            work_days_holiday: Number(values?.work_days_holiday),
                            bonus_hours: Number(values?.bonus_hours),
                            bonus_hours_holiday: Number(values?.bonus_hours_holiday),
                        };

                        if (action == 'create') {
                            mutateCreateTimeKeeping({
                                ...values,
                                ...body
                            });
                        } else {
                            mutateEditTimeKeeping({
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
            title={action === 'create' ? 'Tạo mới thông tin chấm công' : 'Cập nhật thông tin thông tin chấm công'}
            open={!!action}
            keyboard={true}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
            style={{ top: 120 }}
            width={600}
            onCancel={() => {
                onHide()
                form.resetFields();
            }}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={loadingCreateTimeKeeping || loadingEditTimeKeeping}
                        onClick={onConfirm}
                        style={{ background: '#1677ff' }}
                    >
                        {action === 'create' ? 'Xác nhận' : 'Cập nhật'}
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        disabled={loadingCreateTimeKeeping || loadingEditTimeKeeping}
                        onClick={onHide}
                    >
                        Huỷ bỏ
                    </Button>
                </Space>,
            ]}
        >
            <Spin spinning={loadingCreateTimeKeeping || loadingEditTimeKeeping}>
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
                                label={<Text>Thời gian chấm công:</Text>}
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject('Thời gian chấm công không được để trống'),
                                    },
                                ]}
                            >
                                <DatePicker
                                    picker="month"
                                    className='input-item'
                                    format={`[Tháng] MM [năm] YYYY`}
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
                                name="work_days"
                                label="Ngày công đi làm"
                                rules={[
                                    { required: true, message: 'Ngày công đi làm không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Ngày công đi làm"
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
                        <Col span={24}>
                            <Form.Item
                                name="work_days_holiday"
                                label="Ngày công lễ, phép"
                                rules={[
                                    { required: true, message: 'Ngày công lễ, phép không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Ngày công lễ, phép"
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
                        <Col span={24}>
                            <Form.Item
                                name="bonus_hours"
                                label="Thêm giờ thường"
                                rules={[
                                    { required: true, message: 'Thêm giờ thường không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Thêm giờ thường"
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
                        <Col span={24}>
                            <Form.Item
                                name="bonus_hours_holiday"
                                label="Thêm giờ lễ"
                                rules={[
                                    { required: true, message: 'Thêm giờ lễ không được để trống!' },
                                ]}
                            >
                                <InputNumber
                                    className="input-item"
                                    placeholder="Thêm giờ lễ"
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

export default memo(ModalTimeKeeping);
