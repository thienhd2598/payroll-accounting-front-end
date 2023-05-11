import { DeleteOutlined, ToolOutlined } from '@ant-design/icons';
import { Typography, Tag, Space, Button, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { formatNumberToCurrency } from 'utils/helper';
import { DocumentStatus, IDocumentStatus } from './DocumentStatus';

const { Text, Link } = Typography;

interface IColumnProps {
    showConfirmDelete: (id: number) => void;
    onEdit?: () => void;
    setCurrentData?: any
}

const buildColumn = ({ showConfirmDelete }: IColumnProps) => {
    const history = useHistory();

    return [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (id: number, record: any) => {
                const { href } = DocumentStatus.find(_status => _status?.code == Number(record?.status)) || {}

                return (
                    <Link href={`${href}/${id}`} target="_blank">{id}</Link>
                )
            }
        },
        {
            title: 'Ngày tháng văn bản đến',
            width: '18%',
            dataIndex: 'assetCode',
            key: 'assetCode',
            render: (_, record: any) => (
                <Text>{_ || '25/10/2023'}</Text>
            )
        },
        {
            title: 'Loại hồ sơ',
            width: '10%',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => (
                <Text>{type == '1' ? 'Phương tiện' : 'Khác'}</Text>
            )
        },
        {
            title: 'Số phiếu tiếp nhận',
            width: '10%',
            dataIndex: 'number_receive',
            key: 'number_receive',
            render: (number_receive: string) => (
                <Text>{Number(number_receive)}</Text>
            )
        },
        {
            title: 'Tên doanh nghiệp',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => (
                <Text>{name || '--'}</Text>
            )
        },
        {
            title: 'Trạng thái',
            width: '15%',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const { title, color } = DocumentStatus.find(
                    (_status: IDocumentStatus) => _status.code == Number(status)
                ) || { title: 'Mới tạo', color: 'blue' }
                return (
                    <Tag color={color}>
                        {title}
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
                                    const { href } = DocumentStatus.find(_status => _status?.code == Number(record?.status)) || {};

                                    history.push(`${href}/${record?.id}`)
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