import { Card, Col, Descriptions, Row, Space, Tabs, Skeleton, Empty } from 'antd';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
const { TabPane } = Tabs;

const RecentSearch = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fecthData = async () => {
            const data: any = await db.collection("search").get();
            setSearchResult(data.docs.map((doc: any) => doc.data()));
            setLoading(false)
        }
        fecthData();
    }, []);
    return (
        <div className="my-5">
            <Row>
                <Col span={12} offset={6}>
                    <Tabs defaultActiveKey="1" type="card" style={{ marginBottom: 32, minHeight: 220 }} size={"large"}>
                        <TabPane tab="Hospitals" key="1">
                            <Row className="mb-5 justify-content-center">
                                <Skeleton loading={loading} active>
                                    {searchResult.filter((value: any) => value.searchBy.toLowerCase() === "hospitals").length ? searchResult.filter((value: any) => value.searchBy.toLowerCase() === "hospitals").map((data: any) => <CustomCard {...data} />) : <CustomEmpty name="Hospitals" />}
                                </Skeleton>
                            </Row>
                        </TabPane>
                        <TabPane tab="Pharmacies" key="2">
                            <Row className="mb-5 justify-content-center">
                                {searchResult.filter((value: any) => value.searchBy.toLowerCase() === "pharmacies").length ? searchResult.filter((value: any) => value.searchBy.toLowerCase() === "pharmacies").map((data: any) => <CustomCard {...data} />) : <CustomEmpty name="Pharmacies" />}
                            </Row>
                        </TabPane>
                        <TabPane tab="Clinics" key="3">
                            <Row className="mb-5 justify-content-center">
                                {searchResult.filter((value: any) => value.searchBy.toLowerCase() === "clinics").length ? searchResult.filter((value: any) => value.searchBy.toLowerCase() === "clinics").map((data: any) => <CustomCard {...data} />) : <CustomEmpty name="Clinics" />}
                            </Row>
                        </TabPane>
                        <TabPane tab="Medical Offices" key="4">
                            <Row className="mb-5 justify-content-center">
                                {searchResult.filter((value: any) => value.searchBy.toLowerCase() === "medical offices").length ? searchResult.filter((value: any) => value.searchBy.toLowerCase() === "medical offices").map((data: any) => <CustomCard {...data} />) : <CustomEmpty name="Medical Offices" />}
                            </Row>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    )
}

export default RecentSearch

interface CustomEmptyProps {
    name: string;
}
const CustomEmpty = ({ name }: CustomEmptyProps) => <Col md={8}>
    <Empty
        imageStyle={{
            height: 60,
        }}
        description={
            <span className="text-capitalize">
                No Search Made For {name}
            </span>
        } />
</Col>
interface CustomCardProps {
    time: any;
    location: string;
    radius: string;
}
const CustomCard = ({ time, location, radius }: CustomCardProps) => <Col key={time} md="4" style={{ marginLeft: "2px" }} className="my-1">
    <Card
        style={{ width: 250 }}

    >
        <Descriptions size="small" column={1}>
            <Descriptions.Item label="Location">{location}</Descriptions.Item>
            <Descriptions.Item label="Radius">{radius}</Descriptions.Item>
            <Descriptions.Item label="Time">{moment.unix(time.seconds).format('MMMM Do YYYY, h:mm a')}</Descriptions.Item>
        </Descriptions>
    </Card>
</Col>