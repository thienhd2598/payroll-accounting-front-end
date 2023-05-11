import React, { useMemo, useCallback, memo } from "react";
import { Modal, Typography, Spin, Tag } from 'antd';
import { useQuery } from 'react-query';
import BriefService from "services/Brief/Brief.service";
import TableCommon from "components/TableCommon";
import { HistoryMapping, IHistoryMapping } from "./DocumentStatus";
import dayjs from "dayjs";

interface DocumentHistoryProps {
    show: boolean,
    brief_id: number,
    onHide: () => void
}

const { Text } = Typography;

const DocumentHistory = ({
    show, onHide, brief_id
}: DocumentHistoryProps) => {
    const { isLoading: loadingHistory, data: dataHistory } = useQuery('GET_HISTORY_BRIEF', async () => {
        let response = await BriefService.getHistoryBrief({
            brief_id
        })

        return response.data
    }, {
        staleTime: 10 * (60 * 1000),
    });    

    return (
        <Modal
            title="Lịch sử thao tác"
            open={show}
            keyboard={true}
            bodyStyle={{ marginTop: 20  }}
            style={{ top: 150 }}
            width={700}
            onCancel={onHide}  
            footer={false}          
        >
            <TableCommon
                dataSource={dataHistory || []}            
                loading={loadingHistory}
                scroll={{ y: '45vh' }}
                pagination={{
                    showTotal: (total: number) => <Text>Tổng số {total}</Text>,
                }}
                columns={[
                    {
                        title: 'Thao tác',
                        dataIndex: 'type',
                        key: 'type',
                        render: (type: string) => {
                            const nameHistory = HistoryMapping?.find((_history: IHistoryMapping) => _history.key == type)?.name || 'Khác'

                            return <Text>{nameHistory}</Text>
                        }
                    }, 
                    {
                        title: 'Người thao tác',
                        dataIndex: 'user',
                        width: '25%',
                        key: 'user',
                        render: (user: any) => (
                            <Tag color={user?.type == 1 ? "red" : 'cyan'}>{user?.name || '--'}</Tag>
                        )   
                    },
                    {
                        title: 'Thời gian thao tác',
                        width: '25%',
                        dataIndex: 'updated_at',
                        key: 'updated_at',
                        render: (updated_at: string) => (
                            <Text>{updated_at ? dayjs(updated_at).format('DD/MM/YYYY') : '--'}</Text>
                        )   
                    },
                ]}
                onChangePagination={() => { }}
            />
        </Modal>
    )
};

export default memo(DocumentHistory);