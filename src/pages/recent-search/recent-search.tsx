import { EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Empty, Modal, Row, Skeleton, Tabs } from 'antd';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IconText } from '../../components/display-search-result/display-search-result';
import { getUserSearches } from '../../firebase';
import "./recent-search.css";
const { TabPane } = Tabs;
const { Meta } = Card;

const RecentSearch = (props: any) => {
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fecthData = async () => {
            const data: any = await getUserSearches(props.user);
            setSearchResult(data);
            setLoading(false)
        }
        fecthData();
    }, [props.user]);
    return (
        <div className="my-5">
            <Row>
                <Col span={12} offset={6}>
                    <Tabs defaultActiveKey="1" type="card" style={{ marginBottom: 32, minHeight: 220 }} size={"large"}>
                        <TabPane tab="Hospitals" key="1">
                            <Row className="mb-5 justify-content-center">
                                <Skeleton loading={loading} active>
                                    {searchResult.filter((value: any) => value.searchBy.toLowerCase() === "hospitals").length ? searchResult.filter((value: any) => value.searchBy.toLowerCase() === "hospitals").map((data: any) => <CustomCard key={data.id} history={props.history} path={props.match.path} {...data} />) : <CustomEmpty name="Hospitals" />}
                                </Skeleton>
                            </Row>
                        </TabPane>
                        <TabPane tab="Pharmacies" key="2">
                            <Row className="mb-5 justify-content-center">
                                {searchResult.filter((value: any) => value.searchBy.toLowerCase() === "pharmacies").length ? searchResult.filter((value: any) => value.searchBy.toLowerCase() === "pharmacies").map((data: any) => <CustomCard key={data.id} history={props.history} path={props.match.path} {...data} />) : <CustomEmpty name="Pharmacies" />}
                            </Row>
                        </TabPane>
                        <TabPane tab="Clinics" key="3">
                            <Row className="mb-5 justify-content-center">
                                {searchResult.filter((value: any) => value.searchBy.toLowerCase() === "clinics").length ? searchResult.filter((value: any) => value.searchBy.toLowerCase() === "clinics").map((data: any) => <CustomCard key={data.id} history={props.history} path={props.match.path} {...data} />) : <CustomEmpty name="Clinics" />}
                            </Row>
                        </TabPane>
                        <TabPane tab="Medical Offices" key="4">
                            <Row className="mb-5 justify-content-center">
                                {searchResult.filter((value: any) => value.searchBy.toLowerCase() === "medical offices").length ? searchResult.filter((value: any) => value.searchBy.toLowerCase() === "medical offices").map((data: any) => <CustomCard key={data.id} history={props.history} path={props.match.path} {...data} />) : <CustomEmpty name="Medical Offices" />}
                            </Row>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col>
                    <Route path={`${props.match.path}/:id`} render={props => <SingleSearchComp {...props} state={searchResult} />} />
                </Col>
            </Row>
        </div>
    )
}
export default RecentSearch

interface SingleSearchComp {
    state: Array<Object>;
    match: any;
    history: any;
    location: any;
}
const SingleSearchComp = ({ state, match, history, location }: SingleSearchComp) => {
    const [open, setOpen] = useState("");
    useEffect(() => {
        setOpen(match.params.id)
    }, [match.params.id])
    const result: any = state.find((value: any) => value.id === match.params.id);
    const Ok = () => {
        setOpen("");
        history.push(match.path.replace(":id", ""))
    }
    return result ?
        <Modal
            title={result.location}
            visible={!!open}
            width={1040}
            onOk={Ok}
            onCancel={Ok}
        >
            <Row style={{ maxHeight: "300px", overflowY: "scroll" }}>
                {result.data.map((data: any) => <Col key={data.name} span={6} className="my-2">
                    <Card
                        style={{ width: 230, }}
                        cover={
                            <img
                                style={{ width: "60%", marginLeft: "20%" }}
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
                                {data.opening_hours && <Descriptions.Item label="Open Now">{data.open_now ? "YES" : "NO"}</Descriptions.Item>}
                            </Descriptions>}
                        />
                    </Card>
                </Col>)}
            </Row>
        </Modal >
        : null
}
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
    history: any;
    path: string;
    id: string;
}
const CustomCard = ({ time, location, radius, history, path, id }: CustomCardProps) => <Col key={time} md="4" onClick={() => history.push(`${path}/${id}`)} style={{ marginLeft: "2px" }} className="my-1 hover">
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