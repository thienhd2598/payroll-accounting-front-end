import { toast } from 'react-toastify';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const optionAlert = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0,
  theme: 'colored',
} as any;

export const showAlert = {
  success: mess => {
    toast.success(
      <p style={{ fontSize: 14, margin: 0 }}>{mess}</p>,
      optionAlert,
    );
  },
  warn: mess => {
    toast.warn(<p style={{ fontSize: 14, margin: 0 }}>{mess}</p>, optionAlert);
  },
  error: mess => {
    toast.error(<p style={{ fontSize: 14, margin: 0 }}>{mess}</p>, optionAlert);
  },
  info: mess => {
    toast.info(<p style={{ fontSize: 14, margin: 0 }}>{mess}</p>, optionAlert);
  },
};

export const formatNumberToCurrency = (n: any = 0, toFixed = 2) => {
  if (!n) {
    return 0;
  }
  let reg = /(\d)(?=(\d{3})+(?:\.\d+)?$)/g;

  let number = parseFloat(n).toFixed(toFixed) as any;
  if (parseInt(n) - number == 0) {
    number = parseInt(n);
  }

  return number.toString().replace(reg, '$&,');
};

export const getColorSubStatusDevice = (
  state: string,
  isConnected: boolean,
) => {
  switch (state) {
    case 'normal':
      if (isConnected) {
        return 'green';
      } else {
        return 'red';
      }
    case 'alarm':
      return '#fadb14';
    case 'error':
      return 'red';
    default:
      return '#000';
  }
};

export const getSubStatusDevice = (state: string, isConnected: boolean) => {
  switch (state) {
    case 'normal':
      if (isConnected) {
        return 'Bình thường';
      } else {
        return 'Không xác định';
      }
    case 'alarm':
      return 'Cảnh báo cháy';
    case 'error':
      return 'Có lỗi';
    default:
      return '--';
  }
};

export const isSubscriptionExpired = (date?: string) => {
  if (!date) return false;
  return new Date(date) > new Date(new Date().toDateString());
};

export const getSubscriptionStatus = (status?: number, date?: string) => {
  if (isSubscriptionExpired(date)) {
    return 'Hết hạn';
  } else if (status == 1) {
    return 'Kích hoạt';
  } else {
    return 'Chưa kích hoạt';
  }
};

export const getSubscriptionColor = (status?: number, date?: string) => {
  if (isSubscriptionExpired(date)) {
    return 'red';
  } else if (status == 1) {
    return 'green';
  } else {
    return '#868686';
  }
};

export const getSubscriptionIcon = (status?: number, date?: string) => {
  if (isSubscriptionExpired(date)) {
    return <CloseCircleOutlined className='icon-base' />;
  } else if (status == 1) {
    return <CheckCircleOutlined className='icon-base' />;
  } else {
    return <ClockCircleOutlined className='icon-base' />;
  }
};

//To meters
export const distance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radLat1 = (Math.PI * lat1) / 180;
    var radLat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radTheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344 * 1000;
    return Math.ceil(dist);
  }
};
