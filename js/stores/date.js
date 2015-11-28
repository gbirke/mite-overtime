var commands = require( '../actions/commands' ),
	Reflux = require( 'reflux-core' ),
	moment = require( 'moment' ),
	DateStore = Reflux.createStore( {
		init: function ( date ) {
			this.listenToMany( commands );
			this.date = moment( date || new Date() );
		},
		onSetDate: function ( date ) {
			this.date = moment( date );
			this.trigger();
		},
		getMonth: function () {
			return this.date.month();
		},
		getYear: function () {
			return this.date.year();
		}
	} );

module.exports = DateStore;
