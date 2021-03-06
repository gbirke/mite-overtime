import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Panel } from 'react-bootstrap'
import { configure } from '../redux_actions'

function renderSuccess(submitSucceeded) {
	if (!submitSucceeded) {
		return;
	}
	return (
		<Panel bsStyle="success" header="Settings saved">Your settings were saved successfully.</Panel>
	);
}

class SettingsComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { handleSubmit, save, submitSucceeded } = this.props;
		// TODO Bootstrap components
		return (
			<Row>
				<Col xs={10} xsOffset={1} md={4} mdOffset={4}>
					{renderSuccess(submitSucceeded)}
					<form id="settingsForm" onSubmit={handleSubmit( save )}>
						<div className="form-group">
							<label htmlFor="hoursPerWeek">Hours per week</label>
							<Field type="number" component="input" className="form-control" id="hoursPerWeek" name="hoursPerWeek" />
						</div>
						<button type="submit" className="btn btn-primary submit">Save</button>
					</form>
				</Col>
			</Row>
		);
	}
}

const Settings = reduxForm( {
	form: 'settings',

} )( SettingsComponent );

const InitializedSettings = connect(
	state => ( {
		initialValues: state.settings
	}),
	{ save: configure }
)(Settings);

export default InitializedSettings;