import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Typography,
  Space,
} from 'antd';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router';
import { showAlert } from 'utils/helper';
import { useMutation } from 'react-query';
import AuthenService from 'services/Authentication/Authentication.service';
import { SignUpParams } from 'services/Authentication/Authentication.types';
import RegisterWrapper from './Register.style';
import Logo from 'images/upbase-logo-2.svg';

const { Text, Link } = Typography;

const Register = () => {
  const history = useHistory();
  const location: any = useLocation();
  const [form] = Form.useForm();

  const { isLoading: loadingSignUp, mutate: mutateSignUp } = useMutation(
    ({ name, phone, email, password, passwordConfirmation }: SignUpParams) => {
      return AuthenService.signUp({ name, phone, email, password, passwordConfirmation });
    }, {
    onSuccess: (res) => {
      console.log({ res });
      if (res.status === 200) {
        history.push('/login');
        showAlert.success('Đăng ký thành công');
      } else {
        showAlert.error(res.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
      }
    },
    onError: (err: Error) => {
      showAlert.error(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
    },
  }
  );

  const onFinish = useCallback(() => {
    try {
      form.validateFields().then(async values => {
        mutateSignUp(values);
      });
    } catch (err) {
      showAlert.error(err || 'Đã có lỗi xảy ra, vui lòng thử lại');
    }
  }, []);

  return (
    <RegisterWrapper>
      <Helmet titleTemplate="Đăng ký - Admin" defaultTitle="Đăng ký - Admin">
        <meta name="description" content="Đăng ký - Admin" />
      </Helmet>
      <Row style={{ background: '#f0f2f5', height: '100vh' }}>
        <Col xs={24} xl={24} md={24} lg={24} className="col-login" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 50 }}>
            <img src={Logo} style={{ width: 180 }} />
          </div>
          <Card className="card" style={{ maxWidth: 500 }}>
            <Spin spinning={loadingSignUp}>
              <Text className="txt-title-brand">Đăng ký</Text>
              <Form
                form={form}
                onFinish={onFinish}
                className="form-brand"
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Email sai định dạng!',
                    },
                    {
                      required: true,
                      message: 'Email không được để trống!',
                    },
                  ]}
                >
                  <Input
                    className="input-item"
                    placeholder="Email"
                    size="large"
                    prefix={<MailOutlined style={{ marginRight: 4 }} />}
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: 'Mật khẩu không được để trống!' },
                  ]}
                >
                  <Input.Password
                    className="input-item"
                    placeholder="Mật khẩu"
                    prefix={<SettingOutlined style={{ marginRight: 4 }} />}
                    iconRender={visible =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="passwordConfirmation"
                  label="Xác nhận mật khẩu"
                  rules={[
                    { required: true, message: 'Xác nhận mật khẩu không được để trống!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Xác nhận mật khẩu không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    className="input-item"
                    placeholder="Xác nhận mật khẩu"
                    prefix={<SettingOutlined style={{ marginRight: 4 }} />}
                    iconRender={visible =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="btn-brand btn-login"
                    type="primary"
                    htmlType="submit"
                    loading={loadingSignUp}
                  >
                    Đăng ký
                  </Button>
                </Form.Item>
                <Row justify="center" style={{ marginTop: 30 }}>
                  <Text>Doanh nghiệp đã có tài khoản? Vui lòng <Link href='/login'>vào đây</Link> để đăng nhập.</Text>
                </Row>
              </Form>
            </Spin>
          </Card>
        </Col>

      </Row>
    </RegisterWrapper>
  );
};

export default Register;
