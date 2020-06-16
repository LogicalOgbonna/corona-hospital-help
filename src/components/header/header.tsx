import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ENYE</Navbar.Brand>
            <Nav className="ml-auto mr-auto">
                <p className="text-white pt-2">HOSPITALS NEAR ME</p>
            </Nav>

        </Navbar>
    )
}

export default Header
