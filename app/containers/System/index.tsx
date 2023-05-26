import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Modal, Row, Skeleton, Space, Table, Typography } from 'antd';
import { createApolloClient } from 'apollo/index';
import FilterCommon from 'components/FilterCommon';
import TableCommon from 'components/TableCommon';
import React, {
    memo, useCallback, useEffect, useLayoutEffect, useState
} from 'react';
import { Helmet } from 'react-helmet-async';
import { useLayoutContext } from '../Layout/LayoutContext';
import logo from 'images/logo-dark.svg';

const { Text } = Typography;

const System = () => {
    const { appendBreadcrumb } = useLayoutContext();

    useLayoutEffect(() => {
        appendBreadcrumb([
            {
                title: 'Trang chủ',
                pathname: '/',
            },
            {
                title: 'Hệ thống',
                pathname: '/he-thong/',
            },
        ]);
    }, []);

    return (
        <React.Fragment>
            <Helmet titleTemplate="Hệ thống - Admin" defaultTitle="Hệ thống - Admin">
                <meta name="description" content="Hệ thống - Admin" />
            </Helmet>
            <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40, marginTop: 30 }}>
                <Text style={{ fontSize: 36 }} strong>Hệ thống tính lương và các khoản trích theo lương Upbase</Text>
                <img
                    className="logo"
                    style={{ width: '50%', height: 'auto', borderRadius: 10 }}
                    src={'https://i.pinimg.com/564x/82/97/a0/8297a0b934dea86a1867f71f09346e94.jpg'}
                />
            </Row>
        </React.Fragment>
    )
};

export default System;