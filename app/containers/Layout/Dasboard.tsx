import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ArrowUpOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, BackTop, Affix, Typography, Space, Tag } from 'antd';
import React, { ReactNode, useState, useEffect } from 'react';
import BreadcrumbList from './Breadcrumb/index';
import LayoutWrapper from './Layout.styles';
import MenuLayout from './Menu/index';
import { LayoutProvider } from './LayoutContext';
import HeaderLayout from './Header';
import { useMemo } from 'react';
import logo from 'images/logo-dark.svg';

const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const role = localStorage.getItem('role');

  return (
    <LayoutProvider>
      <LayoutWrapper>
        <Layout hasSider>
          <Sider
            className="layout-sider"
            breakpoint="lg"
            width={240}
            onBreakpoint={broken => setCollapsed(broken)}
            collapsed={collapsed}
          >
            <Affix offsetTop={0.1}>
              <div
                className="logo-wrapper"
                style={{
                  background: '#fff',
                  // boxShadow: '0 1px 9px -3px rgb(0 0 0 / 10%)',
                }}
              >
                <img className="logo" src={logo} />
              </div>
            </Affix>
            <MenuLayout />
            {/* {!collapsed && (
              <Space
                direction="vertical"
                style={{ margin: 16, position: 'absolute', bottom: 0 }}
                size={4}
              >
                <Text style={{ fontSize: 11 }}>
                  Thiết kế bởi Công ty cp công nghệ RSA
                </Text>
              </Space>
            )} */}
          </Sider>
          <Layout
            className="site-layout"
            style={{ marginLeft: collapsed ? 80 : 240 }}
          >
            <Header
              className="site-layout-background site-layout-header"
              style={{
                position: 'fixed',
                display: 'flex',
                alignItems: 'center',
                zIndex: 1,
                width: '100%',
                boxShadow: '0 1px 9px -3px rgb(0 0 0 / 10%)',
              }}
            >
              <div>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                  },
                )}
                <Tag
                  style={{ marginLeft: 20 }}
                  icon={<UserOutlined />}
                  color={role == 'admin' ? "#f5222d" : "#13c2c2"}                
                >
                  {role == 'admin' ? 'Người dùng: Nhân viên kế toán' : 'Người dùng: Nhân viên hành chính nhân sự'}                  
                </Tag>
              </div>
              <div
                style={{
                  display: 'inline-block',
                  marginRight: collapsed ? 115 : 275,
                }}
              >
                <HeaderLayout />
              </div>
            </Header>
            <Content className="layout-content">
              <BreadcrumbList />
              <div>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center', background: '#eff2f5' }} />
          </Layout>
        </Layout>
        <BackTop>
          <div className="back-top-wrapper">
            <ArrowUpOutlined className="back-top" />
          </div>
        </BackTop>
      </LayoutWrapper>
    </LayoutProvider>
  );
};

export default Dashboard;
