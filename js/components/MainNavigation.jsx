import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'

import { login } from '../redux_actions'

class MainNavigation extends React.Component {
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
					{ this.props.isLoggedIn ? (
						<Nav pullRight>
							<NavItem eventKey={1} href="#">Settings</NavItem>
							<LinkContainer to={{ pathname: '/login' }}>
								<NavItem eventKey={2} href="#">Logout</NavItem>
							</LinkContainer>
						</Nav>
					) : (
						<Nav pullRight>
							<LinkContainer to={{ pathname: '/login' }}>
								<NavItem eventKey={2} href="#">Login</NavItem>
							</LinkContainer>
						</Nav>
						)
					}
			</Navbar>
		);
	}
}

MainNavigation.propTypes = {
	isLoggedIn: React.PropTypes.bool
};
MainNavigation.defaultProps = {
	isLoggedIn: false
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.credentials.valid
	};
};

const VisibleMainNavigation = connect( mapStateToProps )( MainNavigation );

export default VisibleMainNavigation;