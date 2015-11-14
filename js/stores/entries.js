var serverActions = require( '../actions/server' ),
	settingsStore = require( './settings' ),
	Reflux = require( 'reflux-core' ),
	TimeAggregator = require( '../time_aggregator' );

module.exports = {
	create: function ( serverConnector, overtimeCalculator, calendarDataGenerator ) {
		return Reflux.createStore( {
			init: function() {
				this.listenTo( settingsStore, this.onSettingsChanged );
				this.listenToMany( serverActions );
				this.entries = {};
			},
			onSettingsChanged: function( settings ) {
				this.calendarData = calendarDataGenerator.generateData( settings.year, settings.month );
				overtimeCalculator.hoursPerWeek = settings.hoursPerWeek;
				serverActions.load();
			},
			onLoad: function( credentials ) {
				serverConnector.getData( serverActions.load.completed, serverActions.load.failed );
			},
			onLoadCompleted: function ( result ) {
				var agggregator = new TimeAggregator( result );
				this.entries = overtimeCalculator.getOvertime( agggregator.getAggregatedData() );
				console.log("success!");
				console.log(this.calendarData);
				this.trigger( { calendarData: this.calendarData, overtimeData: this.entries } );
			},
			onLoadFailed: function ( result ) {
				console.log("fail!");
				console.log(result);
			},
			calendarData: {},
		} );
	}
}
