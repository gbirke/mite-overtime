var Reflux = require( 'reflux-core' ),
	settingsActions = require( '../actions/settings' ),
	settingsStore = Reflux.createStore( {
		init: function() {
			var now = new Date( '2015-10-01' );
			this.listenToMany( settingsActions );
			this.settings = {
				account: '',
				apiKey: '',
				hoursPerWeek: 40,
				year: now.getYear(),
				month: now.getMonth()
			};
		},
		onChangeSettings: function( newSettings ) {
			var s;
			for ( s in this.settings ) {
				if ( this.settings.hasOwnProperty( s ) && s in newSettings ) {
					this.settings[ s ] = newSettings[ s ];
				}
			}
			this.trigger( this.settings );
		}

	} );

module.exports = settingsStore;