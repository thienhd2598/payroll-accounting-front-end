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
            width: 50,
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
            title: 'Lương cơ bản',
            dataIndex: 'b1',
            key: 'b1',
            render: (b1) => (
                <Text>{formatNumberToCurrency(b1)} vnđ</Text>
            )
        },
        {
            title: 'Ngày công chuẩn',
            dataIndex: 'b2',
            key: 'b2',
            render: (b2) => (
                <Text>{b2 || '--'} ngày</Text>
            )
        },
        {
            title: 'Giờ công chuẩn',
            dataIndex: 'b3',
            key: 'b3',
            render: (b3) => (
                <Text>{b3 || '--'} giờ</Text>
            )
        },
        {
            title: 'Tỉ lệ bảo hiểm xã hội',
            dataIndex: 'b4',
            key: 'b4',
            render: (b4) => (
                <Text>{b4 || '--'} %</Text>
            )
        },
        {
            title: 'Tỉ lệ bảo hiểm y tế',
            dataIndex: 'b5',
            key: 'b5',
            render: (b5) => (
                <Text>{b5 || '--'} %</Text>
            )
        },
        {
            title: 'Tỉ lệ bảo hiểm thất nghiệp',
            dataIndex: 'b6',
            key: 'b6',
            render: (b6) => (
                <Text>{b6 || '--'} %</Text>
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