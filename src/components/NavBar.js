import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function NavBar() {
        // <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        //     <a className="navbar-brand" href="#">Ecommerce - ReactJS</a>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>

        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul className="navbar-nav mr-auto">
        //             <li className="nav-item active">
        //                 <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        //             </li>
        //             <li className="nav-item dropdown">
        //                 <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                 Categorias
        //                 </a>
        //                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        //                     <a className="dropdown-item" href="#">Audio y video</a>
        //                     <a className="dropdown-item" href="#">Computación</a>
        //                     <a className="dropdown-item" href="#">Libreria</a>
        //                     <a className="dropdown-item" href="#">Limpieza</a>
        //                 </div>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
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