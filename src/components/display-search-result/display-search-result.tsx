import { EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import { Card, Skeleton, Descriptions, Result, Space } from 'antd';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const { Meta } = Card;
interface SearchResultProps {
    loading: boolean;
    result: Array<Object>;
}
interface IconTextProps {
    icon: any;
    text: string;
}
const IconText = ({ icon, text }: IconTextProps) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
function SearchResult({ loading, result }: SearchResultProps) {
    console.log(result)
    return (
        <Row className="justify-content-center my-5">
            <Col style={{ minHeight: "250px" }} md="8">
                <Row className="justify-content-center">
                    <Skeleton loading={loading} active>

                        {!loading && !result.length && <Result
                            status="404"
                            title="No Hospital To Display"
                            subTitle="Select a radius to search for hospital."
                        />}
                        {result.map((data: any) => <Col key={data.name} md="4" className="mt-2">
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
                                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    <EllipsisOutlined className="pull-right" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    title={<Descriptions size="small" column={1} title={data.name}>
                                        <Descriptions.Item label="Status">{data.business_status}</Descriptions.Item>
                                        <Descriptions.Item label="Vicinity">{data.vicinity}</Descriptions.Item>
                                        {data.opening_hours && <Descriptions.Item label="Open Now">{data.open_now ? "YES" : "NO"}</Descriptions.Item>}
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
