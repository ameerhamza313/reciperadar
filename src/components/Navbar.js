import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">RecipeRadar</Navbar.Brand> {/* Use Link to navigate to Home */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Use Link to navigate to Home */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {/* Use Link to navigate to Favorite Recipes */}
            <Nav.Link as={Link} to="/favorites">Favorite Recipes</Nav.Link>
            {/* Add more Nav.Links for other pages */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
