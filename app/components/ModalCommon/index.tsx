import React, { memo, useCallback, useMemo } from 'react';
import { Button, InputNumber, Col, DatePicker, Form, Input, Modal, Row, Skeleton, Space, Spin, Table, Typography } from 'antd';
import dayjs from 'dayjs';

const { confirm } = Modal;
const { Text } = Typography;

export interface IDataForm {
    title: string,
    type: string,
    name: string,
    disabled?: boolean,
    required?: boolean,
    options?: {
        value: string | number,
        label: string
    }
};

interface ModalCommonProps {
    isVisible: boolean,
    toggleVisible: () => void,
    dataForm: IDataForm[],
    data?: any,
    onSuccess: (values: any) => void,
    title: string,
    loading: boolean,
    width?: number,
    colSpan: number
}

const ModalCommon = ({
    isVisible,
    toggleVisible,
    dataForm,
    data,
    onSuccess,
    title,
    loading,
    width = 650,
    colSpan = 24
}: ModalCommonProps) => {
    const [form] = Form.useForm();
    console.log({ dataForm, data })

    useMemo(
        () => {
            if (!data || !dataForm) return;
            const valueNewForm = dataForm.reduce(
                (result, current) => {
                    const key = current.name;
                    result[key] = data?.[key] || null

                    return result;
                }, {}
            )                        
            form.setFieldsValue({ ...valueNewForm });
        }, [data, dataForm]
    );

    const onHideModal = useCallback(
        () => {
            toggleVisible();
            form.resetFields();
        }, [toggleVisible]
    );

    return (
        <Modal
            title={title}
            open={isVisible}
            keyboard={true}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
            style={{ top: 100 }}
            width={width}
            onCancel={onHideModal}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={false}
                        onClick={() => {
                            form.validateFields()
                                .then(async (values: any) => onSuccess(values))
                        }}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        onClick={onHideModal}
                    >
                        Huỷ
                    </Button>
                </Space>,
            ]}
        >
            <Spin spinning={loading}>
                <Form
                    form={form}
                    name="basic"
                    style={{ marginTop: 20 }}
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    <Row gutter={30}>                        
                        {dataForm.map(
                            (_form: IDataForm, index: number) => {
                                return (
                                    <Col
                                        key={`form-item-common-${index}`}
                                        span={colSpan}
                                    >
                                        <Form.Item
                                            label={<Text>{_form?.title}:</Text>}
                                            name={`${_form.name}`}
                                            rules={_form.required ? [
                                                {
                                                    required: true,
                                                    validator: (_, value) =>
                                                        value
                                                            ? Promise.resolve()
                                                            : Promise.reject(`${_form.title} không được để trống`),
                                                },
                                            ] : []}
                                            htmlFor={`${_form.name}`}
                                        >
                                            {_form.type == 'input' && (
                                                <Input
                                                    id={`${_form.name}`}
                                                    onChange={(event: any) => {
                                                        const value = event.target?.value;
                                                        form.setFieldValue(`${_form.name}`, value);
                                                    }}
                                                    className='input-item'
                                                    placeholder={`Nhập ${_form.title.toLowerCase()}`}
                                                    disabled={_form.disabled}
                                                    allowClear
                                                />
                                            )}
                                            {_form.type == 'number' && (
                                                <InputNumber
                                                    className="input-item"
                                                    placeholder="Phí"
                                                    style={{ width: '100%' }}
                                                    min={0}
                                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                                                    onChange={(value: any) => form.setFieldValue(`${_form.name}`, value)}
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
                                            )}
                                            {_form.type == 'date' && (
                                                <DatePicker
                                                    className='input-item'
                                                    placeholder={`Nhập ${_form.title.toLowerCase()}`}
                                                    format="DD-MM-YYYY"
                                                    onChange={(value) => {
                                                        const newValue = dayjs(value).format('DD-MM-YYYY');
                                                        form.setFieldValue(`${_form.name}`, newValue);
                                                    }}
                                                    disabled={_form.disabled}
                                                    allowClear
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                )
                            }
                        )}
                    </Row>
                </Form>
            </Spin>
        </Modal>
    );
};

export default memo(ModalCommon);