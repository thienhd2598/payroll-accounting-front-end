import { EyeInvisibleOutlined, EyeTwoTone, SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Modal, Radio, Row, Space, Spin } from "antd";
import React, { memo, useCallback, useMemo } from "react";
import UserService from 'services/User/User.service';
import { UpdateProfileParams } from 'services/User/User.types';
import { showAlert } from 'utils/helper';
import { useQuery, useMutation } from 'react-query';

interface IModalChangeProfile {
    show: boolean,
    onHide: () => void
}

interface IProfileQuery {
    isLoading: boolean,
    data: {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        type: string;
        address: string | null;
        status: string;
        gender: string;
        created_at: Date;
    }
}

const GENDER = [
    { value: 1, label: 'Nam' },
    { value: 2, label: 'Nữ' },
];

const ModalChangeProfile = ({ show, onHide }: IModalChangeProfile) => {
    const [form] = Form.useForm();

    const { isLoading: loadingGetProfile, data: dataProfile } = useQuery('GET_PROFILE', async () => {
        let response = await UserService.getProfile();

        return response.data;
    }) as IProfileQuery;

    const { isLoading: loadingUpdateProfile, mutate: mutateUpdateProfile } = useMutation(
        ({ name, phone, gender, address }: UpdateProfileParams) => {
            return UserService.updateProfile({ name, phone, gender, address });
        }, {
        onSuccess: (res) => {
            if (res.status === 200) {
                showAlert.success('Cập nhật thông tin tài khoản thành công');
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
            if (!!dataProfile && Object.keys(dataProfile).length > 0) {
                const { email, name, phone, gender, address } = dataProfile;

                form.setFieldsValue({
                    email,
                    phone,
                    name,
                    address,
                    gender: Number(gender),
                });
            }
        }, [dataProfile]
    );

    const onUpdateProfile = useCallback(
        () => {
            try {
                form.validateFields()
                    .then(async values => {
                        let { name, phone, address, gender } = values;

                        mutateUpdateProfile({ name, phone, address, gender });
                    })
            } catch (err) {
                showAlert.error(err || 'Đã có lỗi xảy ra, vui lòng thử lại');
            }
        }, []
    );

    return (
        <Modal
            title={'Thông tin cá nhân'}
            open={show}
            keyboard={true}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
            style={{ top: 100 }}
            width={600}
            onCancel={onHide}
            footer={[
                <Space size={20}>
                    <Button
                        type="primary"
                        className="btn-base"
                        loading={loadingGetProfile || loadingUpdateProfile}
                        onClick={onUpdateProfile}
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
                </Space>,
            ]}
        >
            <Spin spinning={loadingGetProfile || loadingUpdateProfile}>
                <Form
                    form={form}
                    name="basic"
                    style={{ marginTop: 20 }}
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                    >
                        <Input
                            className="input-item"
                            placeholder="Email"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Họ và tên"
                        rules={[
                            { required: true, message: 'Họ và tên không được để trống!' },
                        ]}
                    >
                        <Input
                            className="input-item"
                            placeholder="Họ và tên"
                            allowClear
                        />
                    </Form.Item>
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
                    <Form.Item
                        name="gender"
                        label="Giới tính"
                    >
                        <Radio.Group
                            style={{ width: '100%' }}
                            onChange={() => { }}
                        >
                            {GENDER.map((gender: { value: number, label: string }) => (
                                <Radio value={gender.value}>{gender.label}</Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
};

export default memo(ModalChangeProfile);