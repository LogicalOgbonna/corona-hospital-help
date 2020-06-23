import { EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Result, Row, Skeleton, Space } from 'antd';
import React from 'react';

const { Meta } = Card;
interface SearchResultProps {
    loading: boolean;
    result: Array<Object>;
}
interface IconTextProps {
    icon: any;
    text: string;
}
export const IconText = ({ icon, text }: IconTextProps) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
function SearchResult({ loading, result }: SearchResultProps) {
    return (
        <Row className="justify-content-center my-5">
            <Col style={{ minHeight: "250px" }} span={16}>
                <Row className="justify-content-center">
                    <Skeleton loading={loading} active>

                        {!loading && !result.length && <Result
                            status="404"
                            title="No Hospital To Display"
                            subTitle="Select a radius to search for hospital."
                        />}
                        {result.map((data: any) => <Col key={data.id} span={8} className="mt-2">
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        style={{ width: "80%", marginLeft: "10%" }}
                                        alt="example"
                                        src={data.icon}
                                    />
                                }
                                actions={[
                                    <IconText icon={StarOutlined} text={data.rating} key="list-vertical-star-o" />,
                                    <EllipsisOutlined className="pull-right" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    title={<Descriptions size="small" column={1} title={data.name}>
                                        <Descriptions.Item label="Status">{data.business_status}</Descriptions.Item>
                                        <Descriptions.Item label="Vicinity">{data.vicinity}</Descriptions.Item>
                                        {data.opening_hours && <Descriptions.Item label="Open Now">{data.opening_hours.open_now ? "YES" : "NO"}</Descriptions.Item>}
                                    </Descriptions>}
                                />
                            </Card>
                        </Col>)}
                    </Skeleton>
                </Row>
            </Col>
        </Row>
    )
}

export default SearchResult
