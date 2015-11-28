module.exports = {
	create: function ( $, settingsActions, commands ) {
		return Object.create( {
			init: function() {
				$( '#submit_settings' ).on( 'click', this.handleSubmit );
			},
			handleSubmit: function () {
				var apiKey = $( '#api_key' ).val(),
					account = $( '#account' ).val(),
					hoursPerWeek = $( '#hours_per_week' ).val(),
					now = new Date( '2015-10-01' ); // TODO use current date

				settingsActions.changeCredentials( { apiKey: apiKey, account: account } );
				settingsActions.changeHoursPerWeek( parseInt( hoursPerWeek, 10 ) );
				commands.showEntriesForMonth( now.getYear(), now.getMonth() );
				return;
			}
		} );
	},
	createAndInit: function( $, settingsActions, commands ) {
		var view = this.create( $, settingsActions, commands );
		view.init();
		return view;
	}
}
