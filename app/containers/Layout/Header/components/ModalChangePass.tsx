import { EyeInvisibleOutlined, EyeTwoTone, SettingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Spin } from "antd";
import React, { memo, useCallback } from "react";
import UserService from 'services/User/User.service';
import { ChangePasswordParams } from 'services/User/User.types';
import { showAlert } from 'utils/helper';
import { useMutation } from 'react-query';

interface IModalChangePass {
    show: boolean,
    onHide: () => void
}

const ModalChangePass = ({ show, onHide }: IModalChangePass) => {
    const [form] = Form.useForm();

    const { isLoading: loadingChangePass, mutate: mutateChangePass } = useMutation(
        ({ password, password_old }: ChangePasswordParams) => {
            return UserService.changePassword({ password, password_old });
        }, {
        onSuccess: (res) => {
            if (res.status === 200) {
                showAlert.success('Đổi mật khẩu thành công');
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

    const onConfirmChangePass = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        const { password, password_old } = values || {};
                        mutateChangePass({ password, password_old });
                    });
            } catch (err) {
                showAlert.error(err || 'Đã có lỗi xảy ra, vui lòng thử lại');
            }
        }, []
    );

    return (
        <Modal
            title={'Đổi mật khẩu'}
            open={show}
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
                        loading={loadingChangePass}
                        onClick={onConfirmChangePass}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        type="primary"
                        className="btn-base"
                        danger
                        onClick={onHide}
                    >
                        Huỷ
                    </Button>
                </Space>
            ]}
        >
            <Spin spinning={loadingChangePass}>
                <Form
                    form={form}
                    name="basic"
                    style={{ marginTop: 20 }}
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="password_old"
                        label="Mật khẩu cũ"
                        rules={[
                            { required: true, message: 'Mật khẩu cũ không được để trống!' },
                        ]}
                    >
                        <Input.Password
                            className="input-item"
                            placeholder="Mật khẩu cũ"
                            prefix={<SettingOutlined style={{ marginRight: 4 }} />}
                            iconRender={visible =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="password_new"
                        label="Mật khẩu mới"
                        rules={[
                            { required: true, message: 'Mật khẩu mới không được để trống!' },
                        ]}
                    >
                        <Input.Password
                            className="input-item"
                            placeholder="Mật khẩu mới"
                            prefix={<SettingOutlined style={{ marginRight: 4 }} />}
                            iconRender={visible =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Nhập lại mật khẩu mới"
                        rules={[
                            { required: true, message: 'Nhập lại mật khẩu mới không được để trống!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password_new') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Xác nhận mật khẩu mới không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            className="input-item"
                            placeholder="Nhập lại mật khẩu mới"
                            prefix={<SettingOutlined style={{ marginRight: 4 }} />}
                            iconRender={visible =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
};

export default memo(ModalChangePass);