import { ExclamationCircleFilled } from '@ant-design/icons';
import { Form, Modal, Space, Typography } from 'antd';
import buildColumn from 'components/Document/DocumentColumns';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import {
    memo, useCallback
} from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import BriefService from 'services/Brief/Brief.service';
import { CONTANST_DOCUMENT } from './DocumentStatus';

const { Text } = Typography;

const dataFilter: Array<any> = [
    {
        key: 'orderCode',
        title: 'Tìm theo CO',
        type: 'input'
    },
    {
        key: 'orderCode',
        title: 'Tìm theo CQ',
        type: 'input'
    },
    {
        key: 'orderCode',
        title: 'Số kế hoạch',
        type: 'input'
    },
    {
        key: 'orderCode',
        title: 'Công ty',
        type: 'select',
        options: [
            { title: 'Công ty TTTN Công nghệ điều chế Chất lỏng NTN', value: '123' },
            { title: 'Công ty TTTN Công nghệ Thienhd', value: '234' },
        ],
    },
];

const { confirm } = Modal;

const DocumentList = ({
    status,
}: { status?: number }) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { isLoading: loadingListDocument, data: dataListDocument } = useQuery(
        typeof status == 'number' ? CONTANST_DOCUMENT[status] : 'GET_LIST_ALL_DOCUMENT',
        async () => {
            let response;
            if (typeof status == 'number') {
                response = await BriefService.getListBrief({
                    status: status
                });
            } else { 
                response = await BriefService.getListAllBrief({                    
                });
             }

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });


    const showConfirmDelete = useCallback((id: number) => {
        confirm({
            title: `Bạn có muốn xoá hồ sơ này?`,
            icon: <ExclamationCircleFilled />,
            style: { top: '35vh' },                                
            okText: 'Xoá',
            cancelText: 'Đóng',
            okButtonProps: {
                type: 'primary',
                style: { minWidth: 80 }
                // icon: <DeleteOutlined className="icon-base" />,
                // className: 'btn-base',
            },
            cancelButtonProps: {
                type: 'primary',
                danger: true,
                style: { minWidth: 80 }
                // className: 'btn-base',
            },
            onOk: async () => {
            },
            onCancel() { },
        });
    }, []);

    return (
        <Space className='space-base' direction="vertical" size={30}>
            <FilterCommon
                form={form}
                loading={loadingListDocument}
                dataFilter={dataFilter}
                onSearch={() => { }}
                onReSearch={() => { }}
            />
            <TableCommon
                dataSource={dataListDocument || []}
                loading={loadingListDocument}
                pagination={{
                    showTotal: (total: number) => <Text>Tổng số {total}</Text>,
                }}
                columns={buildColumn({ showConfirmDelete })}
                onChangePagination={() => { }}
            />
        </Space>
    )
};

export default memo(DocumentList);