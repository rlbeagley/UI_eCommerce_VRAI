import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function CustomNavBar() {
  return (
    <Navbar bg="white" expand="lg" className="border-0 shadow-none customNav">
      <Container>
        <Navbar.Brand as={Link} to="/">VRAI</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
        ------ Summer Sale: HALF OFF all Ocean's Breeze fullsize bottles this week only ------
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/checkout"><FaShoppingCart size={20} /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}