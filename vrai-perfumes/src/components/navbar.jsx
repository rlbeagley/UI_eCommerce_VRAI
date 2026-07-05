import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaShoppingCart} from "react-icons/fa";

export default function CustomNavBar() {
    return(
        <Navbar bg="white" expand="lg" className="border-0 shadow-none customNav">
        <Container>
            <Navbar.Brand href="/">VRAI</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
                <Nav.Link href="/shop">Shop</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/checkout"><FaShoppingCart size={20}/></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}