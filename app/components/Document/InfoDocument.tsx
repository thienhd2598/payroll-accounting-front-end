import React, { memo } from "react";
import { Badge, Card, Col, Row, Skeleton, Space, Spin, Typography } from "antd";
import { DetailBriefResponse } from "services/Brief/Brief.types";
import dayjs from "dayjs";
import { DocumentStatus } from "components/Document/DocumentStatus";

const { Text, Link } = Typography;

interface InfoDocumentProps {
    dataDetail: any,
    status: string,
    loading: boolean
};

const InfoDocument = ({
    dataDetail,
    status,
    loading
}: InfoDocumentProps) => {
    const { color, title } = DocumentStatus?.find(__ => __.code == Number(status)) || { color: 'cyan', title: 'Mới tạo' };

    return (
        <Badge.Ribbon        
            text={loading ? 'Loading...' : title}
            color={color}
        >
            <Card bordered={false} loading={false} title="Thông tin hồ sơ">
                <Spin spinning={loading}>
                    {!!loading && <Skeleton loading={loading} />}
                    {!loading && <Space
                        className='space-base'
                        size={30}
                        direction="vertical"
                    >
                        <Row>
                            <Text className='txt-right' strong>Loại hồ sơ:</Text>
                            <Text>{dataDetail?.type == '1' ? 'Phương tiện' : 'Khác'}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Tên người nộp hồ sơ:</Text>
                            <Text>{dataDetail?.name_contact || '--'}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Số phiếu tiếp nhận:</Text>
                            <Text>{`0000${dataDetail?.number_receive || '--'}`}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Số điện thoại liên hệ:</Text>
                            <Text>{dataDetail?.phone_contact || '--'}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Ngày tiếp nhận:</Text>
                            <Text>{!!dataDetail?.day_reception ? dayjs(dataDetail?.day_reception).format('DD/MM/YYYY') : '--'}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Giấy ủy quyền:</Text>
                            {
                                dataDetail?.file_authorization_letter
                                    ? <Link target="_blank" download href={dataDetail?.file_authorization_letter}>{dataDetail?.file_authorization_letter}</Link>
                                    : '--'
                            }
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Giấy giới thiệu:</Text>
                            {
                                dataDetail?.file_referral
                                    ? <Link target="_blank" download href={dataDetail?.file_referral}>{dataDetail?.file_referral}</Link>
                                    : '--'
                            }
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Ngày tháng văn bản đề nghị kiểm định (PC26):</Text>
                            <Text>{!!dataDetail?.date_in_come ? dayjs(dataDetail?.date_in_come).format('DD/MM/YYYY') : '--'}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Tên Doanh nghiệp:</Text>
                            <Text>{dataDetail?.company?.name || '--'}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Tên dự án, công trình:</Text>
                            <Text>{dataDetail?.name_project || '--'}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Địa điêm lấy mẫu:</Text>
                            <Text>{dataDetail?.address_get_sample || '--'}</Text>
                        </Row>
                        <Row>
                            <Text className='txt-right' strong>Ghi chú:</Text>
                            <Text>{dataDetail?.content || '--'}</Text>
                        </Row>
                    </Space>}
                </Spin>
            </Card>
        </Badge.Ribbon>
    )
};

export default memo(InfoDocument);