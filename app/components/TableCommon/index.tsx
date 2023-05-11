import { Table } from 'antd';
import { memo } from "react";
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';
import type { TablePaginationConfig, ColumnsType } from 'antd/es/table';

interface IDataSource {
    title: string,
    width: number,
    dataIndex: string,
    key: string,
    fixed?: string;
}

interface IPagination {
    pageSize?: number,
    total?: number,
    current?: number
    showTotal?: (total: number) => void
}

interface ITableScroll {
    x?: number | string,
    y?: number | string,
}

interface ITableCommon {
    loading: boolean,
    columns: any,
    dataSource: any,
    pagination: any,
    onChangePagination: (pagination: TablePaginationConfig) => void
    size?: 'small' | 'middle' | 'large' | undefined,
    scroll?: ITableScroll,
};

const TableCommon = ({
    loading,
    size = 'middle',
    columns,
    dataSource = [],
    pagination = {},
    scroll = {},
    onChangePagination
}: ITableCommon) => {
    return (
        <Table
            size={size}
            scroll={scroll}            
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            bordered
            pagination={pagination}
            onChange={onChangePagination}
        />
    )
};

export default memo(TableCommon);