import { DeleteOutlined, ToolOutlined } from '@ant-design/icons';
import { Typography, Tag, Space, Button, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { memo } from 'react';
import { formatNumberToCurrency } from 'utils/helper';

const { Text, Link } = Typography;

interface IColumnProps {
    showConfirmDelete: (id: string) => void;
    onEdit?: () => void;
    setCurrentData?: any
}

const buildColumn = ({ showConfirmDelete, setCurrentData }: IColumnProps) => {
    return [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            render: (id: number, row, index: number) => (
                <Text>{index + 1}</Text>
            )
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'staff',
            key: 'staff',
            render: (staff) => (
                <Text>{staff?.name || '--'}</Text>
            )
        },
        {
            title: 'Lương cơ bản',
            dataIndex: 'salary_basic',
            key: 'salary_basic',
            render: (salary_basic) => (
                <Text>{formatNumberToCurrency(salary_basic)} vnđ</Text>
            )
        },
        {
            title: 'Ngày công chuẩn',
            dataIndex: 'work_day_standard',
            key: 'work_day_standard',
            render: (work_day_standard) => (
                <Text>{work_day_standard || '--'} ngày</Text>
            )
        },
        {
            title: 'Giờ công chuẩn',
            dataIndex: 'work_hours_standard',
            key: 'work_hours_standard',
            render: (work_hours_standard) => (
                <Text>{work_hours_standard || '--'} giờ</Text>
            )
        },
        {
            title: 'Tỉ lệ bảo hiểm xã hội',
            dataIndex: 'insurance_social_rate',
            key: 'insurance_social_rate',
            render: (insurance_social_rate) => (
                <Text>{insurance_social_rate || '--'} %</Text>
            )
        },
        {
            title: 'Tỉ lệ bảo hiểm y tế',
            dataIndex: 'insurance_health_rate',
            key: 'insurance_health_rate',
            render: (insurance_health_rate) => (
                <Text>{insurance_health_rate || '--'} %</Text>
            )
        },
        {
            title: 'Tỉ lệ bảo hiểm thất nghiệp',
            dataIndex: 'insurance_unemployment_rate',
            key: 'insurance_unemployment_rate',
            render: (insurance_unemployment_rate) => (
                <Text>{insurance_unemployment_rate || '--'} %</Text>
            )
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 120,
            render: (_, record: any) => {
                return (
                    <Space direction="horizontal" size={15}>
                        <Tooltip placement='top' title="Cập nhật">
                            <Button
                                type='primary'
                                shape="circle"
                                size="middle"
                                style={{ background: '#1677ff', borderColor: '#1677ff' }}
                                icon={<ToolOutlined className='icon-base' />}
                                onClick={() => setCurrentData(record)}
                            />
                        </Tooltip>
                        <Tooltip placement="top" title="Xoá">
                            <Button
                                size="middle"
                                type="primary"
                                shape="circle"
                                icon={<DeleteOutlined className='icon-base' />}
                                danger
                                onClick={() => showConfirmDelete(record?.id)}
                            />
                        </Tooltip>
                    </Space>
                );
            },
        },
    ]
};

export default buildColumn;