import React from "react";
import { Container, Navbar, Nav,  } from "react-bootstrap";
import logo from '../images/img/icon-above-font.png'

const NavBar = () => {
  return (
    <div>
      <Navbar bg="secondary" expand="lg" >
        <Container className="d-flex">
           <Navbar.Brand href="#home">
                      <img src={logo} alt="logo"  width="85" height="85"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto" >
              <Nav.Link href="#home" >Home</Nav.Link>
              <Nav.Link href="#link">Profil</Nav.Link>
                <Nav.Link href="#chat">Chat</Nav.Link>
                          
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
