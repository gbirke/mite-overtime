import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { IndexLink } from 'react-router'

export class MainNavigation extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<IndexLink to="/"><span>Mite Overtime</span></IndexLink>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav pullRight>
					<NavItem eventKey={1} href="#">Settings</NavItem>
					<LinkContainer to={{ pathname: '/login' }}>
						<NavItem eventKey={2} href="#">Login</NavItem>
					</LinkContainer>
				</Nav>
			</Navbar>
		);
	}
}