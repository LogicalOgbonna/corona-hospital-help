import React from 'react'
import { FormControl, Button, Row, Col } from 'react-bootstrap'

interface SearchProps {
    location: string;
    onClickSearch: any;
    onSearchChange: any;
    value: string
}
function Search({ location, onClickSearch, onSearchChange, value }: SearchProps) {
    return (
        <>
            <Row className="justify-content-center mt-5">
                Current Location: {location}
            </Row>
            <Row className="justify-content-center ">
                <Col md="6" className="d-flex">
                    <FormControl type="text" onChange={onSearchChange} value={value} placeholder="Enter radius e.g 500" className="mr-sm-2" />
                    <Button onClick={onClickSearch} variant="outline-info">Search</Button>
                </Col>
            </Row>
        </>
    )
}

export default Search
