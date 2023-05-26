import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LogoutOutlined,
    SettingOutlined, ShopOutlined, UserOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Spin, Badge, Typography, Form, Modal, Space, Button, Input } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation } from 'react-query';
import AuthenService from 'services/Authentication/Authentication.service';
import ModalChangePass from './components/ModalChangePass';
import ModalChangeProfile from './components/ModalChangeProfile';
import HeaderLayoutWrapper, { MenuHeaderWrapper } from './Header.style';
import { showAlert } from 'utils/helper';
import avatar from 'images/logo-study.jpg';

const { Text } = Typography;

const MenuHeaderDropdown = ({ onChangePass, onChangeProfile }: { onChangePass: () => void, onChangeProfile: () => void }) => {
    const history = useHistory();
    const { mutate: mutateSignOut } = useMutation(
        () => {
            return AuthenService.signOut();
        }, {
        onSuccess: (res) => {
            console.log({ res });
            if (res.status === 200) {
                localStorage.removeItem('jwt-token');
                localStorage.removeItem('info_admin');
                history.push('/login');
            } else {
                showAlert.error(res.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
            }
        },
        onError: (err: Error) => {
            showAlert.error(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại');            
        },
    }
    );

    return (
        <MenuHeaderWrapper>
            <Menu className="menu-header" selectedKeys={[]}>
                <Menu.Item key="profile" style={{ height: 40 }} onClick={onChangeProfile}>
                    <UserOutlined style={{ marginRight: 15 }} />
                    Thông tin tài khoản
                </Menu.Item>
                <Menu.Item key="settings" style={{ height: 40 }} onClick={onChangePass}>
                    <SettingOutlined style={{ marginRight: 15 }} />
                    Đổi mật khẩu
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    key="logout"
                    style={{ color: 'red', height: 40 }}
                    onClick={() => {
                        localStorage.removeItem('jwt-token');
                        localStorage.removeItem('role');
                        history.push('/login')
                    }}
                >
                    <LogoutOutlined style={{ marginRight: 15 }} />
                    Đăng xuất
                </Menu.Item>
            </Menu>
        </MenuHeaderWrapper>
    )
};

const HeaderLayout = () => {
    const [showChangePass, setShowChangePass] = useState<boolean>(false);    
    const [showChangeProfile, setShowChangeProfile] = useState<boolean>(false);

    return (
        <HeaderLayoutWrapper>
            <ModalChangePass show={showChangePass} onHide={() => setShowChangePass(false)} />
            <ModalChangeProfile show={showChangeProfile} onHide={() => setShowChangeProfile(false)} />
            <Dropdown
                overlay={
                    <MenuHeaderDropdown
                        onChangePass={() => setShowChangePass(true)}
                        onChangeProfile={() => setShowChangeProfile(true)}
                    />
                }
                placement="bottomLeft"
                arrow
            >
                <div className='header-avatar-wrapper'>
                    <Badge status="success" dot={true} offset={[-18, 48]}>
                        <Avatar
                            className="header-avatar"
                            alt="avatar"
                            src={avatar}
                        />
                    </Badge>
                    <Text>{localStorage.getItem('info_admin') ? JSON.parse(localStorage.getItem('info_admin') || 'Trần Phương Linh')?.name : 'Trần Phương Linh'}</Text>
                </div>
            </Dropdown>
        </HeaderLayoutWrapper>
    );
};

export default HeaderLayout;