import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import Overtime from './Overtime'

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if ( this.props.isLoggedIn ) {
			return ( <Overtime /> );
		} else {
			return ( <Login /> )
		}
	}
}

Home.propTypes = {
	isLoggedIn: React.PropTypes.bool
};
Home.defaultProps = {
	isLoggedIn: false
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.credentials.valid
	};
};

const VisibleHome = connect( mapStateToProps )( Home );

export default VisibleHome;