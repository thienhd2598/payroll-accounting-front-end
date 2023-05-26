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
            title: 'Tên mẫu ứng lương',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <Text>{name || '--'}</Text>
            )
        },
        {
            title: 'Nhân viên',
            dataIndex: 'staff',
            key: 'staff',
            render: (staff) => (
                <Text>{staff?.name || '--'}</Text>
            )
        },
        {
            title: 'Tài khoản hệ thống',
            dataIndex: 'staff',
            key: 'staff',
            render: (staff) => (
                <Space direction="vertical" size={20}>
                    <Text>Tài khoản nợ: <strong>334</strong></Text>
                    <Text>Tài khoản có: <strong>141</strong></Text>
                </Space>
            )
        },
        {
            title: 'Số tiền tạm ứng',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <Text>{formatNumberToCurrency(price)} vnđ</Text>
            )
        },
        {
            title: 'Lý do',
            dataIndex: 'note',
            key: 'note',
            render: (note: string) => (
                <Text>{note || '--'}</Text>
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