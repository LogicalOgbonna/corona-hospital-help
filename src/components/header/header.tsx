import { SearchOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';


interface Header {
    user: any
}
function Header({ user }: Header) {

    const menu = (
        <Menu onClick={() => { }}>
            <Menu.Item key="2" icon={<SearchOutlined />}>
                <Link to="/search-results">
                    Search Histroy
                    </Link>
            </Menu.Item>
            <Menu.Item onClick={() => auth.signOut()} key="1" icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    )
    return (
        <Navbar bg="dark" variant="dark">
            <Link to="/">
                <Navbar.Brand>ENYE</Navbar.Brand>
            </Link>
            <Nav className="ml-auto mr-auto">
                <p className="text-white pt-2">HOSPITALS NEAR ME</p>
            </Nav>
            {user ?
                <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                    {user.displayName}
                </Dropdown.Button>
                :
                <Link className="btn btn-primary" to="/signin">
                    Sign in
                    </Link>
            }
        </Navbar>
    )
}

export default Header
