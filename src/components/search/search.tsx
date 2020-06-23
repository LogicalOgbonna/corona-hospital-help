import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select } from 'antd';
import React from 'react';

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
                            <Select.Option value="Hospitals">Hospitals</Select.Option>
                            <Select.Option value="Pharmacies">Pharmacies</Select.Option>
                            <Select.Option value="Clinics">Clinics</Select.Option>
                            <Select.Option value="Medical Offices">Medical Offices</Select.Option>
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
