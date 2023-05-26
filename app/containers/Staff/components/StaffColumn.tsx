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
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <Text>{name || '--'}</Text>
            )
        },        
        {
            title: 'Phòng ban',
            dataIndex: 'department',
            key: 'department',
            render: (department) => (
                <Text>{department?.name || '--'}</Text>
            )
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
            render: (position) => (
                <Text>{position?.name || '--'}</Text>
            )
        },
        {
            title: 'Cấp bậc thuế',
            dataIndex: 'income_tax',
            key: 'income_tax',
            render: (income_tax) => (
                <Text>{income_tax?.name || '--'}</Text>
            )
        },  
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => (
                <Text>{phone || '--'}</Text>
            )
        },      
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (birthday) => (
                <Text>{dayjs.unix(birthday).format('DD-MM-YYYY') || '--'}</Text>
            )
        },      
        {
            title: 'Mã số thuế',
            dataIndex: 'tax_code',
            key: 'tax_code',
            render: (tax_code: string) => {
                return (
                    <Text>{tax_code || '--'}</Text>
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