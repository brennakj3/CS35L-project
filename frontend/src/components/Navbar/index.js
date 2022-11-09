import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//Adapted from react-bootstrap documentation
//TODO: Add Login/Signup button on far right, also home and review page might eventually be different
//This is the top navbar that routes to the different pages 
function TopNavbar() {
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">UCLA Dining Hall Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>  
            <Nav.Link href="/">Write A Review</Nav.Link>
            <NavDropdown title="Dining Halls" id="basic-nav-dropdown">
              <NavDropdown.Item href="/de_neve">De Neve</NavDropdown.Item>
              <NavDropdown.Item href="/bruin_plate">Bruin Plate</NavDropdown.Item>
              <NavDropdown.Item href="/epicuria">Epicuria</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default TopNavbar;