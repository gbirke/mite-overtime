import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap'

class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit (data) {
		// TODO call login action with credentials, succeed (and navigate to main) or fail
		console.log("mysub", data);
		console.log("props",this.props);
		return {};
	}

	render() {
		const { handleSubmit } = this.props;
		// TODO Bootstrap components
		return (
			<Row>
				<Col xs={10} xsOffset={1} md={4} mdOffset={4}>
					<form id="settingsForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<div className="form-group">
							<label htmlFor="account">Account</label>
							<Field type="text" component="input" className="form-control" id="account" placeholder="account name" value="wmd" name="account" />
						</div>
						<div className="form-group">
							<label htmlFor="api_key">API Key</label>
							<Field type="password" component="input" className="form-control" id="api_key" placeholder="c0ffee" name="api_key" />
						</div>
						<button type="submit" className="btn btn-default submit">Save</button>
					</form>
				</Col>
			</Row>
		);
	}
}

LoginComponent.propTypes = {
	serverConnector: React.PropTypes.object
};

LoginComponent.defaultProps = {
	serverConnector: {foo:"bar"}
};

const Login = reduxForm( {
	form: 'login',


} )( LoginComponent );

export default Login;