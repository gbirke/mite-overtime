import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'

import MainNavigation from './MainNavigation'

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="xtc">
				<MainNavigation/>
				<Grid>
							{this.props.children }
				</Grid>
			</div>
		);
	}
}