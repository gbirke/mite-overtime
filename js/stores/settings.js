var Reflux = require( 'reflux-core' ),
	settingsActions = require( '../actions/settings' ),
	settingsStore = Reflux.createStore( {
		init: function() {
			this.listenToMany( settingsActions );
			this.settings = {
				account: '',
				apiKey: '',
				hoursPerWeek: 40
			};
		},
		onChangeHoursPerWeek: function ( hoursPerWeek ) {
			this.settings.hoursPerWeek = hoursPerWeek;
		}
		onChangeCredentials: function( newCredentials ) {
			this.settings.apiKey = newCredentials.apiKey;
			this.settings.account = newCredentials.account;
		}
	} );

module.exports = settingsStore;
