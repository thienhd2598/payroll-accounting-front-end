import { CaretRightOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Modal, Row, Skeleton, Space, Table, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../../Layout/LayoutContext';
import { Collapse, Divider } from 'antd';
import buildColumn from './components/TimeKeepingColumn';

const { Panel } = Collapse;


const { confirm } = Modal;
const { Text } = Typography;

const Page = () => {
    const client = createApolloClient();
    const { appendBreadcrumb } = useLayoutContext();

    const [form] = Form.useForm();
    const [action, setAction] = useState<string>('');

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
            <Button
                type="primary"
                className="btn-base"
                style={{ float: 'right', marginBottom: 20 }}
                icon={<PlusOutlined className="icon-base" />}
                onClick={() => setAction('create')}
            >
                Thêm bảng chấm công
            </Button>
            <Space className='space-base' direction="vertical" size={30}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <Collapse
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ marginTop: 10 }} />}
                        bordered={false}                    
                        style={{ background: '#fff' }}
                    >
                        <Panel header={
                            <Space className='space-base' style={{ justifyContent: 'space-between' }}>
                                <Text strong>{`Bảng chấm công tháng ${item} - 2023`}</Text>
                                <Button
                                    type="primary"
                                    style={{ background: '#1677ff' }}
                                    onClick={(e: any) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }}
                                >
                                    Thêm nhân viên
                                </Button>
                            </Space>
                        } key="1">
                            <TableCommon
                                dataSource={[
                                    { id: 1, name: 'Nguyễn Khánh Thiện', email: 21, department: 2, position: 4, phone: 2 },
                                    { id: 2, name: 'Trần Phương Linh', email: 20, department: 4, position: 1, phone: 1 },
                                ]}
                                loading={false}
                                pagination={{
                                    showTotal: (total: number) => <Text>Tổng số {total}</Text>,
                                }}
                                columns={buildColumn({ showConfirmDelete })}
                                onChangePagination={() => { }}
                            />
                        </Panel>
                    </Collapse>
                ))}
            </Space>
        </React.Fragment>
    );
};

export default memo(Page);
