import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Link to="/">
                <Navbar.Brand>ENYE</Navbar.Brand>
            </Link>
            <Nav className="ml-auto mr-auto">
                <p className="text-white pt-2">HOSPITALS NEAR ME</p>
            </Nav>
            <Link className="btn btn-primary" to="/search-results">
                Search Histroy
            </Link>
        </Navbar>
    )
}

export default Header
