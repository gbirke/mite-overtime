var serverActions = require( '../actions/server' ),
	commands = require( '../actions/commands' ),
	Reflux = require( 'reflux-core' );

module.exports = {
	create: function ( serverConnector, overtimeFactory, calendarDataStore ) {
		return Reflux.createStore( {
			init: function () {
				this.listenTo( calendarDataStore, this.onCalendarData );
				this.listenToMany( serverActions );
				this.listenToMany( commands );
				this.entries = {};
				this.calendarData = {};
			},
			onCalendarData: function () {
				this.calendarData = calendarDataStore.calendarData;
				serverActions.load( this.calendarData.year, this.calendarData.month );
			},
			onLoad: function ( year, month ) {
				serverConnector.getData( year, month, serverActions.load.completed, serverActions.load.failed );
			},
			onLoadCompleted: function ( result ) {
				var months = overtimeFactory.getMonthsFromEntries( result );
				this.entries = months[ this.calendarData.month ];
				this.trigger( { calendarData: this.calendarData, overtimeData: this.entries } );
			}, // onLoadFailed is handled in ErrorStore
			calendarData: {},
			entries: {}
		} );
	}
};
