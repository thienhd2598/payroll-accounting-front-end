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
            render: (id: number, row, index: number) => (
                <Text>{index + 1}</Text>
            )
        },
        {
            title: 'Cấp bậc thu nhập chịu thuế',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <Text>{name || '--'}</Text>
            )
        },        
        {
            title: 'Thuế suất',
            dataIndex: 'rate',
            key: 'rate',
            render: (rate) => (
                <Text>{rate || '--'} %</Text>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: string) => {
                return (
                    <Text>{dayjs(created_at).format('HH:mm DD/MM/YYYY')}</Text>
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