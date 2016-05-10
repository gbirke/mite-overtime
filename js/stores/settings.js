var Reflux = require( 'reflux-core' ),
	objectAssign = require( 'object-assign' ),
	settingsActions = require( '../actions/settings' ),
	settingsStore = Reflux.createStore( {
		init: function () {
			this.listenToMany( settingsActions );
		},
		onChangeHoursPerWeek: function ( hoursPerWeek ) {
			this.hoursPerWeek = hoursPerWeek;
			this.trigger();
		},
		onChangeCredentials: function ( newCredentials ) {
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
		apiUrl: '',

		// not changeable at the moment
		workingDays: [ 1, 2, 3, 4, 5 ],
		locale: 'de',
		holidayFunction: null
	} );

module.exports = settingsStore;
