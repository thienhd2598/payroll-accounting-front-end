import { DeleteOutlined, ToolOutlined } from '@ant-design/icons';
import { Typography, Tag, Space, Button, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { memo } from 'react';
import { formatNumberToCurrency } from 'utils/helper';

const { Text, Link } = Typography;

interface IColumnProps {
    showConfirmDelete: (id: number) => void;
    onEdit: (data: any) => void;
}

const buildColumn = ({ showConfirmDelete, onEdit }: IColumnProps) => {
    return [
        {
            title: 'STT',
            width: '5%',
            dataIndex: 'id',
            key: 'id',
            render: (_, row, index) => (
                <Text>{index + 1}</Text>
            )
        },        
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <Text>{name || ''}</Text>
            )
        },        
        {
            title: 'Người đại diện pháp luật',
            dataIndex: 'deputy',
            key: 'deputy',
            render: (deputy) => (
                <Text>{deputy || ''}</Text>
            )
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            render: (address) => (
                <Text>{address || ''}</Text>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status: string) => {
                return (
                    <Tag color={Number(status) == 1 ? 'green' : 'red'}>
                        {Number(status) == 1 ? 'Kích hoạt' : 'Khóa'}
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
                                onClick={() => onEdit(record)}
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