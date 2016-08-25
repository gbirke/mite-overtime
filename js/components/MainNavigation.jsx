import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'

export const MainNavigation = (
	<Navbar>
		<Navbar.Header>
			<Navbar.Brand>
				<a href="#">Mite Overtime</a>
			</Navbar.Brand>
		</Navbar.Header>
		<Nav pullRight>
			<NavItem eventKey={1} href="#">Settings</NavItem>
			<NavItem eventKey={2} href="#">Login</NavItem>
		</Nav>
	</Navbar>
);