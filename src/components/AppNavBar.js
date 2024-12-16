import { useState, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function AppNavBar() {

	const { user } = useContext(UserContext);

	return(
		<Navbar bg="dark" expand="lg" data-bs-theme="dark">
			<Container fluid>
			    <Navbar.Brand as={Link} to="/">G7 Sweat Shop</Navbar.Brand>
			    <Navbar.Toggle aria-controls="basic-navbar-nav" />
			    <Navbar.Collapse id="basic-navbar-nav">
				    <Nav className="ms-auto">
				    	<Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
				    </Nav>
			    </Navbar.Collapse>
			</Container>
		</Navbar>
	)
}