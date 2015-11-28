var serverActions = require( '../actions/server' ),
	commands = require( '../actions/commands' ),
	Reflux = require( 'reflux-core' ),
	TimeAggregator = require( '../time_aggregator' );

module.exports = {
	create: function ( serverConnector, overtimeCalculator, calendarDataGenerator, dateStore ) {
		return Reflux.createStore( {
			init: function () {
				this.listenToMany( serverActions );
				this.listenToMany( commands );
				this.entries = {};
				this.calendarData = {};
			},
			onShowEntries: function () {
				var year = dateStore.getYear(),
					month = dateStore.getMonth();
				this.calendarData = calendarDataGenerator.generateData( year, month );
				serverActions.load( year, month );
			},
			onLoad: function ( year, month ) {
				serverConnector.getData( year, month, serverActions.load.completed, serverActions.load.failed );
			},
			onLoadCompleted: function ( result ) {
				var agggregator = new TimeAggregator( result );
				this.entries = overtimeCalculator.getOvertime( agggregator.getAggregatedData() );
				this.trigger( { calendarData: this.calendarData, overtimeData: this.entries } );
			}, // onLoadFailed is handled in ErrorStore
			calendarData: {},
			entries: {}
		} );
	}
};
