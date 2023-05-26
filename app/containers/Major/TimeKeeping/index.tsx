import { CaretRightOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Modal, Row, Skeleton, Space, Spin, Table, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useMemo, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../../Layout/LayoutContext';
import { Collapse, Divider } from 'antd';
import buildColumn from './components/TimeKeepingColumn';
import ModalTimeKeeping from './components/ModalTimeKeeping';
import { useQuery } from 'react-query';
import TimeKeepingService from 'services/TimeKeeping/TimeKeeping.service';
import * as _ from 'lodash';

const { Panel } = Collapse;


const { confirm } = Modal;
const { Text } = Typography;

const Page = () => {
    const client = createApolloClient();
    const { appendBreadcrumb } = useLayoutContext();

    const [form] = Form.useForm();
    const [action, setAction] = useState<string>('');
    const [currentData, setCurrentData] = useState(null);

    const { isLoading, data, refetch } = useQuery(
        'GET_LIST_TIME_KEEPING',
        async () => {
            const response = await TimeKeepingService.getAllTimeKeeping();

            return response.data;
        }, {
        staleTime: 10 * (60 * 1000),
    });

    const dataTimeKeeping = useMemo(
        () => {
            if (!data) return [];

            const newData = data?.timeKeepings
                ?.map(_item => ({
                    ..._item,
                    date: `${_item.month} - ${_item.year}`
                }));

            return _.groupBy(newData, 'date')
        }, [data]
    );

    console.log({ dataTimeKeeping });

    useLayoutEffect(() => {
        appendBreadcrumb([
            {
                title: 'Trang chủ',
                pathname: '/',
            },
            {
                title: 'Quản lý chấm công',
                pathname: '/cham-cong/',
            },
        ]);
    }, []);

    const showConfirmDelete = useCallback((id: number) => {
        confirm({
            title: `Bạn có muốn xoá chấm công này?`,
            icon: <ExclamationCircleFilled />,
            style: { top: '35vh' },
            okText: 'Xoá',
            cancelText: 'Huỷ bỏ',
            okButtonProps: {
                type: 'primary',
                style: { minWidth: 80 }
            },
            cancelButtonProps: {
                type: 'primary',
                danger: true,
                style: { minWidth: 80 }
            },
            onOk: async () => {
            },
            onCancel() { },
        });
    }, []);

    return (
        <React.Fragment>
            <Helmet titleTemplate="Quản lý chấm công - Admin" defaultTitle="Quản lý chấm công - Admin">
                <meta name="description" content="Quản lý chấm công - Admin" />
            </Helmet>
            <ModalTimeKeeping
                action={action}
                refetch={refetch}
                currentData={currentData}
                onHide={() => {
                    setAction('');
                    setCurrentData(null);
                }}
            />
            <Spin spinning={isLoading}>
                <Button
                    type="primary"
                    className="btn-base"
                    style={{ float: 'right', marginBottom: 20 }}
                    icon={<PlusOutlined className="icon-base" />}
                    onClick={() => {
                        setAction('create')
                        setCurrentData(null);
                    }}
                >
                    Thêm bảng chấm công
                </Button>
                <Space className='space-base' direction="vertical" size={30}>
                    {Object.keys(dataTimeKeeping).map((item, index) => {
                        console.log({ item });
                        return (
                            <Collapse
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                bordered={false}
                                style={{ background: '#fff' }}
                            >
                                <Panel header={
                                    <Space className='space-base' style={{ justifyContent: 'space-between' }}>
                                        <Text strong>{`Bảng chấm công tháng ${item}`}</Text>
                                    </Space>
                                } key="1">
                                    <TableCommon
                                        dataSource={dataTimeKeeping[item]}
                                        loading={false}
                                        pagination={false}
                                        columns={buildColumn({ showConfirmDelete, setCurrentData:(data) => {
                                            setCurrentData(data);
                                            setAction('edit')
                                        } })}
                                        onChangePagination={() => { }}
                                    />
                                </Panel>
                            </Collapse>
                        )
                    })}
                </Space>
            </Spin>
        </React.Fragment>
    );
};

export default memo(Page);
