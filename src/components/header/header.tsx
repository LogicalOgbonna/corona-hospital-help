import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ENYE</Navbar.Brand>
            <Nav className="ml-auto mr-auto">
                <p className="text-white pt-2">HOSPITALS NEAR ME</p>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
    )
}

export default Header
