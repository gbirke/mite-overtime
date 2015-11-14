var Reflux = require( 'reflux-core' ),
	objectAssign = require( 'object-assign' ),
	settingsActions = require( '../actions/settings' ),
	settingsStore = Reflux.createStore( {
		init: function() {
			this.listenToMany( settingsActions );
		},
		onChangeHoursPerWeek: function ( hoursPerWeek ) {
			this.hoursPerWeek = hoursPerWeek;
			this.trigger();
		},
		onChangeCredentials: function( newCredentials ) {
			this.credentials = objectAssign( {}, this.credentials, newCredentials );
			this.trigger();
		},
		onChangeApiUrl: function ( apiUrl ) {
			this.apiUrl = apiUrl;
			this.trigger();
		},
		hoursPerWeek: 40,
		credentials: {
			account: '',
			apiKey: ''
		},
		apiUrl: ''
	} );

module.exports = settingsStore;
