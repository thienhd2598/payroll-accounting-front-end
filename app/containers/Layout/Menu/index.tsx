import {
  SettingOutlined,
  TeamOutlined,
  RocketOutlined,
  AlertOutlined,
  ProfileOutlined,
  DeploymentUnitOutlined,
  ToolOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
  DollarOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import queryString from 'querystring';
import { memo, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';

import { RxDashboard, RxPerson } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import { BiPackage } from 'react-icons/bi';
import { BsBuilding } from 'react-icons/bs';
import { GrDocumentUpdate, GrDocumentExcel, GrDocumentTime, GrDocumentConfig, GrDocumentStore, GrDocumentVerified, GrDocumentUser } from 'react-icons/gr';

interface SubMenuProps {
  key: string;
  label: string;
}

interface MenuDataProps {
  key: string;
  label: string;
  icon: any;
  children?: Array<SubMenuProps> | null;
}

const { SubMenu, Item } = Menu;


const MenuLayout = () => {
  const history = useHistory();
  const location = useLocation();
  const role = localStorage.getItem('role');

  const MenuData: any = useMemo(
    () => {
      return [
        {
          key: '/he-thong',
          label: 'Hệ thống',
          icon: <RxDashboard />,
          children: undefined
        },
        {
          key: '/quan-ly-nhan-vien',
          label: 'Quản lý nhân viên',
          icon: <TeamOutlined />,
        },
        {
          key: '/quan-ly-phong-ban',
          label: 'Quản lý phòng ban',
          icon: <IdcardOutlined />,
        },
        {
          key: '/quan-ly-chuc-vu',
          label: 'Quản lý chức vụ',
          icon: <AuditOutlined />,
        },
        (role === 'admin' ? {
          key: '/nghiep-vu',
          label: 'Nghiệp vụ',
          icon: <DollarOutlined />,
          children: [
            {
              key: '/cham-cong',
              label: 'Chấm công'
            },
            {
              key: '/ung-luong',
              label: 'Tạm ứng lương'
            },
            {
              key: '/tham-so-luong',
              label: 'Tham số lương'
            },
            {
              key: '/thue-thu-nhap-ca-nhan',
              label: 'Thuế TNCN'
            },
            {
              key: '/tinh-luong',
              label: 'Tính lương'
            },
          ]
        } : {}),
        (role === 'admin' ? {
          key: '/bao-cao',
          label: 'Báo cáo',
          icon: <ReconciliationOutlined />,
          children: [
            {
              key: '/bao-cao-luong',
              label: 'Báo cáo lương'
            },
            // {
            //   key: '/bao-cao-cac-khoan-trich-theo-luong',
            //   label: 'Báo cáo các khoản trích theo lương'
            // },
            // {
            //   key: '/bao-cao-bao-hiem',
            //   label: 'Báo cáo bảo hiểm'
            // },
            // {
            //   key: '/bao-cao-thue-tncn',
            //   label: 'Báo cáo thuế TNCN'
            // },
          ]
        } : {})
      ]
    }, [role]
  );
  const params = queryString.parse(
    location.search.slice(1, location.search.length),
  );

  return (
    <Menu
      theme="light"
      mode="inline"
      items={MenuData}
      selectedKeys={
        (!!params.type
          ? `${location.pathname as string}?type=${params.type as string}`
          : (location.pathname as string)) as any
      }
      defaultOpenKeys={MenuData?.map(menu => menu.key)}
      onClick={e => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.push(e?.key);
      }}
    />
  );
};

export default memo(MenuLayout);
