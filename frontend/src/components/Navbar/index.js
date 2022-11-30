import React, { useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


//Adapted from react-bootstrap documentation
//This is the top navbar that routes to the different pages 
function TopNavbar() {
  var [isLoggedIn, setLoggedIn] = useState(false);
  
  useEffect(()=> {
    //This checks if the user val has changed in session storage
    var userLoggedIn = sessionStorage.getItem('userLoggedIn');
    console.log(userLoggedIn);
    //Checking whether user is logged in or not
    //Used for conditionally displaying Login vs Account
    if (userLoggedIn === "false")
    {
      setLoggedIn(false);
    }
    else if (userLoggedIn === "true"){
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false); }
  },[]); 
  
  function handleLogout(){
    //Logs user out
    sessionStorage.setItem('userLoggedIn','false');
    sessionStorage.setItem('user','');
    setLoggedIn(false);
    window.location.href='/';
  }
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">UCLA Dining Hall Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>  
            <Nav.Link href="/review">Write A Review</Nav.Link>
            <NavDropdown title="Dining Halls" id="basic-nav-dropdown">
              <NavDropdown.Item href="/de_neve">De Neve</NavDropdown.Item>
              <NavDropdown.Item href="/bruin_plate">Bruin Plate</NavDropdown.Item>
              <NavDropdown.Item href="/epicuria">Epicuria</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav> 
          </Nav>
          <Nav> {isLoggedIn
          ? <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="/account">Your Account</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
        </NavDropdown>
          : <Nav.Link href="/login">Login/Signup</Nav.Link>  }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default TopNavbar;
