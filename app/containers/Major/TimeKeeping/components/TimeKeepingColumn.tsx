import { DeleteOutlined, ToolOutlined } from '@ant-design/icons';
import { Typography, Tag, Space, Button, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { memo } from 'react';
import { formatNumberToCurrency } from 'utils/helper';

const { Text, Link } = Typography;

interface IColumnProps {
    showConfirmDelete: (id: number) => void;
    onEdit?: () => void;
    setCurrentData?: any
}

const buildColumn = ({ showConfirmDelete, setCurrentData }: IColumnProps) => {
    return [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
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
            title: 'Ngày công đi làm',
            dataIndex: 'work_days',
            key: 'work_days',
            render: (work_days) => (
                <Text>{work_days || '--'}</Text>
            )
        },
        {
            title: 'Ngày công lễ, phép',
            dataIndex: 'work_days_holiday',
            key: 'work_days_holiday',
            render: (work_days_holiday) => (
                <Text>{work_days_holiday || '--'}</Text>
            )
        },
        {
            title: 'Thêm giờ thường',
            dataIndex: 'bonus_hours',
            key: 'bonus_hours',
            render: (bonus_hours) => (
                <Text>{bonus_hours || '--'}</Text>
            )
        },
        {
            title: 'Thêm giờ lễ',
            dataIndex: 'bonus_hours_holiday',
            key: 'bonus_hours_holiday',
            render: (bonus_hours_holiday) => (
                <Text>{bonus_hours_holiday || '--'}</Text>
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
                        <Button
                            type='primary'
                            onClick={() => setCurrentData(record)}
                        >
                            Cập nhật
                        </Button>
                    </Space>
                );
            },
        },
    ]
};

export default buildColumn;