module.exports = {
	create: function ( $, settingsActions, commands ) {
		return Object.create( {
			init: function() {
				$( '#submit_settings' ).on( 'click', this.handleSubmit );
			},
			handleSubmit: function () {
				var apiKey = $( '#api_key' ).val(),
					account = $( '#account' ).val(),
					hoursPerWeek = $( '#hours_per_week' ).val();

				settingsActions.changeCredentials( { apiKey: apiKey, account: account } );
				settingsActions.changeHoursPerWeek( parseInt( hoursPerWeek, 10 ) );
				commands.showEntries();
				return;
			}
		} );
	},
	createAndInit: function( $, settingsActions, commands ) {
		var view = this.create( $, settingsActions, commands );
		view.init();
		return view;
	}
};
