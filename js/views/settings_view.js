module.exports = {
	create: function ( $, settingsActions ) {
		return Object.create( {
			init: function () {
				$( '#submit_settings' ).on( 'click', this.handleSubmit );
			},
			handleSubmit: function () {
				var apiKey = $( '#api_key' ).val(),
					account = $( '#account' ).val(),
					hoursPerWeek = $( '#hours_per_week' ).val();

				settingsActions.changeCredentials( { apiKey: apiKey, account: account } );
				settingsActions.changeHoursPerWeek( parseInt( hoursPerWeek, 10 ) );
				return;
			}
		} );
	},
	createAndInit: function ( $, settingsActions ) {
		var view = this.create( $, settingsActions );
		view.init();
		return view;
	}
};
