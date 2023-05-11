import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row, Space, Spin,
  Typography
} from 'antd';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router';
import { useMutation } from 'react-query';
import AuthenService from 'services/Authentication/Authentication.service';
import { SignInParams } from 'services/Authentication/Authentication.types';
import { showAlert } from 'utils/helper';
import LoginWrapper from './Login.style';
import Logo from 'images/upbase-logo-2.svg';

const { Text, Link } = Typography;

const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const { isLoading: loadingSignIn, mutate: mutateSignIn } = useMutation(
    ({ email, password }: SignInParams) => {
      return AuthenService.signIn({ email, password });
    }, {
    onSuccess: (res) => {
      if (res.status === 200) {
        showAlert.success('Đăng nhập thành công')
        localStorage.setItem('jwt-token-admin', res?.data?.access_token);
        localStorage.setItem(
          'info_admin',
          JSON.stringify(res?.data?.data || ''),
        );
        history.push('/');
      } else {
        showAlert.error(res.message || 'Đã có lỗi xảy ra, vui lòng thử lại')
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
        mutateSignIn(values);
      });
    } catch (err) {
      showAlert.error(err || 'Đã có lỗi xảy ra, vui lòng thử lại');
    }
  }, []);

  return (
    <LoginWrapper>
      <Helmet titleTemplate="Đăng nhập - Admin" defaultTitle="Đăng nhập - Admin">
        <meta name="description" content="Đăng nhập - Admin" />
      </Helmet>
      <Row style={{ background: '#f0f2f5', height: '100vh' }}>
        <Col xs={24} xl={24} md={24} lg={24} className="col-login" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 50 }}>
            <img src={Logo} style={{ width: 180 }} />
          </div>
          <Card className="card" style={{ maxWidth: 500 }}>
            <Spin spinning={loadingSignIn}>
              <Text className="txt-title-brand">Đăng nhập</Text>
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
                <Form.Item>
                  <Button
                    className="btn-brand btn-login"
                    type="primary"
                    htmlType="submit"
                    loading={loadingSignIn}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <Row justify="center" style={{ marginTop: 30 }}>
                  <Text>Doanh nghiệp chưa có tài khoản? Vui lòng <Link href='/register'>vào đây</Link> để đăng ký.</Text>
                </Row>
              </Form>
            </Spin>
          </Card>
        </Col>
      </Row>
    </LoginWrapper>
  );
};

export default Login;
