import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'

import MainNavigation from './MainNavigation'
import { LoginRequired } from './LoginRequired'

export class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// TODO More fancy children selection, depending on login state
		return (
			<div>
				<MainNavigation/>
				<Grid>
							{this.props.children || <LoginRequired/> }
				</Grid>
			</div>
		);
	}
}