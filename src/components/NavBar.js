import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Ecommerce - ReactJS</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Categorias" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#audiovideo">Audio y video</NavDropdown.Item>
                    <NavDropdown.Item href="#computacion">Computación</NavDropdown.Item>
                    <NavDropdown.Item href="#libreria">Libreria</NavDropdown.Item>
                    <NavDropdown.Item href="#limpieza">Limpieza</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
  }

export default NavBar;