import { Col, Row } from 'antd';
import React from 'react';
import Login from './login';

const Auth = () => {


    return (
        <Row className="m-5">
            <Col span={8} offset={8}>
                <Login />
            </Col>
            {/* <Col span={6} offset={6}>
                <Register />
            </Col> */}
        </Row >
    );
};

export default Auth;