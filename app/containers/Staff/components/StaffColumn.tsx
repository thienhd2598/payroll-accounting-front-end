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
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <Text>{name || '--'}</Text>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => (
                <Text>{email || '--'}</Text>
            )
        },
        {
            title: 'Phòng ban',
            dataIndex: 'department',
            key: 'department',
            render: (department) => (
                <Text>{department || '--'}</Text>
            )
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
            render: (position) => (
                <Text>{position || '--'}</Text>
            )
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => (
                <Text>{phone || '--'}</Text>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                return (
                    <Tag color={status == '1' ? 'green' : 'red'}>
                        {status == '1' ? 'Kích hoạt' : 'Chưa kích hoạt'}
                    </Tag>
                )
            }
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
                                style={{ background: '#ff5629', borderColor: '#ff5629' }}
                                icon={<ToolOutlined className='icon-base' />}
                                onClick={() => {
                                }}
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