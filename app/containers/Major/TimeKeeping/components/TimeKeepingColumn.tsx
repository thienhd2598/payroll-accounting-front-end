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

const buildColumn = ({ showConfirmDelete }: IColumnProps) => {
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
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <Text>{name || '--'}</Text>
            )
        },
        {
            title: 'Ngày công đi làm',
            dataIndex: 'email',
            key: 'email',
            render: (email) => (
                <Text>{email || '--'}</Text>
            )
        },
        {
            title: 'Ngày công lễ, phép',
            dataIndex: 'department',
            key: 'department',
            render: (department) => (
                <Text>{department || '--'}</Text>
            )
        },
        {
            title: 'Thêm giờ thường',
            dataIndex: 'position',
            key: 'position',
            render: (position) => (
                <Text>{position || '--'}</Text>
            )
        },
        {
            title: 'Thêm giờ lễ',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => (
                <Text>{phone || '--'}</Text>
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