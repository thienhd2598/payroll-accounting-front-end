import { Col, DatePicker, Form, Input, Row, Button, Space, Select } from 'antd';
import _ from 'lodash';
import React, { memo, useCallback } from 'react';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface IOptionsSelect {
    value: string,
    title: string
}
export interface IDataFilter {
    key: string,
    title: string,
    type: string,
    placeholderPicker?: String[]
    options?: IOptionsSelect[],
};

interface IListCommon {
    form: any,
    loading: boolean,
    dataFilter: IDataFilter[],
    onSearch: () => void,
    onReSearch: () => void,
};

const ListCommon = ({
    form,
    loading = false,
    dataFilter = [],
    onSearch,
    onReSearch
}: IListCommon) => {

    const _renderColumnFilter = useCallback(
        (type: string, title: string, loading: boolean, placeholderPicker: [string, string], options: IOptionsSelect[] = []) => {
            switch (type) {
                case 'input':
                    return (
                        <Input
                            className="input-item"
                            placeholder={title}
                            disabled={loading}
                            allowClear
                        />
                    )
                case 'select':
                    return (
                        <Select
                            className="input-item"
                            placeholder={title}
                            disabled={loading}
                            allowClear
                        >
                            {options?.map((option: IOptionsSelect, index: number) => (
                                <Select.Option
                                    key={`filter-option-select-${index}`}
                                    value={option.value}
                                >
                                    {option.title}
                                </Select.Option>
                            ))}
                        </Select>
                    )
                case 'range-picker':
                    return (
                        <RangePicker
                            className="input-item"
                            placeholder={placeholderPicker}
                            disabled={loading}
                            format="DD/MM/YYYY"
                        />
                    );
                default:
                    return null;
            }
        }, []
    );

    return (
        <Form
            form={form}
            layout="vertical"
            size="middle"
        >
            <Row gutter={24} align="middle">
                {dataFilter?.map(
                    (_data: IDataFilter) => (
                        <Col
                            key={`filter-common-${_data?.key}`}
                            lg={6}
                            xs={8}
                            md={8}
                        >
                            <Form.Item
                                name={_data?.key}
                                label={_data?.title}
                            >
                                {
                                    _renderColumnFilter(_data?.type, _data?.title, loading, _data?.placeholderPicker as [string, string], _data?.options)
                                }
                            </Form.Item>
                        </Col>
                    )
                )}
                <Col lg={6} xs={24} md={12}>
                    <Space size={20}>
                        <Button
                            type="primary"
                            className='btn-base'                            
                            icon={<SearchOutlined className='icon-base' />}
                            onClick={onSearch}
                            >
                            Tìm kiếm
                        </Button>
                        <Button                            
                            className='btn-base'                            
                            icon={<RedoOutlined className='icon-base' />}
                            onClick={onReSearch}
                        >
                            Nhập lại
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Form >
    )
};

export default memo(ListCommon);