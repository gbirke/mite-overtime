import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap'
import { PROMISE } from 'redux-form-saga'
import { login, LOGIN_SUCCESS, LOGIN_FAILURE } from '../redux_actions'

const identity = i => i;

// Non-Thunked replacement for the one in 'redux-form-saga'
// See also https://github.com/mhssmnn/redux-form-saga/pull/3
function createFormAction (requestAction, types, payloadCreator = identity) {
	const actionMethods = {};
	const formAction = (payload) => ({
		type: PROMISE,
		payload
	});

	if (typeof requestAction === 'string') {
		throw new Error("String form action not supported!")
	}

	if (types.length !== 2) {
		throw new Error('Must include two action types: [ SUCCESS, FAILURE ]');
	}

	return Object.assign( (data, dispatch)  => {
			return new Promise((resolve, reject) => {
				dispatch(formAction({
					request: requestAction(data),
					defer: { resolve, reject },
					types
				}));
			});
	}, actionMethods);
}

const formAction = createFormAction( login, [LOGIN_SUCCESS, LOGIN_FAILURE] );

class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { handleSubmit } = this.props;
		// TODO Bootstrap components
		return (
			<Row>
				<Col xs={10} xsOffset={1} md={4} mdOffset={4}>
					<form id="settingsForm" onSubmit={handleSubmit(formAction)}>
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

const Login = reduxForm( {
	form: 'login',

} )( LoginComponent );

export default Login;