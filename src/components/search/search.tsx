import React from 'react';
import { Input, Select, Row, Col, Button } from 'antd';
import { Option } from 'antd/lib/mentions';
import { SearchOutlined } from '@ant-design/icons';

interface SearchProps {
    location: string;
    onClickSearch: any;
    onSearchChange: any;
    value: string;
    onSearchByChange: any;
}
function Search({ location, onClickSearch, onSearchChange, value, onSearchByChange }: SearchProps) {
    return (
        <>
            <Row className="mt-5">
                <Col span={12} offset={6}>
                    <p className="text-center">Current Location: {location}</p>
                    <Input.Group compact>
                        <Select onChange={onSearchByChange} style={{ width: '50%' }} defaultValue="Hospitals">
                            <Option value="Hospitals">Hospitals</Option>
                            <Option value="Pharmacies">Pharmacies</Option>
                            <Option value="Clinics">Clinics</Option>
                            <Option value="Medical Offices">Medical Offices</Option>
                        </Select>
                        <Input value={value} onChange={onSearchChange} style={{ width: '30%' }} placeholder="Enter Radius" />
                        <Button onClick={onClickSearch} style={{ width: '15%', marginLeft: "4px" }} type="dashed" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Input.Group>
                </Col>
            </Row>
        </>
    )
}

export default Search
