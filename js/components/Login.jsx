import React from 'react';

export class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// TODO Move hours per week to settings, add submit handler, use Bootstrap components
		return (
			<form className="form-inline" id="settingsForm">
				<div className="form-group">
					<label hmlFor="account">Account</label>
					<input type="text" className="form-control" id="account" placeholder="wmd" value="wmd" />
				</div>
				<div className="form-group">
					<label hmlFor="api_key">API Key</label>
					<input type="password" className="form-control" id="api_key" placeholder="c0ffee" />
				</div>
				<div className="form-group">
					<label hmlFor="hours_per_week">Hours per week</label>
					<input type="number" className="form-control" id="hours_per_week" value="40" />
				</div>
				<button type="button" className="btn btn-default submit">Save</button>
			</form>
		);
	}
}