var serverActions = require( '../actions/server' ),
	settingsStore = require( './settings' ),
	Reflux = require( 'reflux-core' ),
	TimeAggregator = require( '../time_aggregator' ),
	CalendarDataGenerator = require( '../calendar_data_generator' ),
	WorkTimeCalculator = require( '../worktime_calculator' ),
	OvertimeCalculator = require( '../weekly_overtime_calculator' ),
	ServerConnector = require( '../server_connector' ),
	entriesStore = Reflux.createStore( {
		init: function() {
			this.listenTo( settingsStore, this.onSettingsChanged );
			this.listenToMany( serverActions );
			this.entries = {};
			// TODO research how to inject dependent objects instead of creating them
			this.worktimeCalc = new WorkTimeCalculator( [ 1, 2, 3, 4, 5 ] ); 
			this.overtimeCalculator = new OvertimeCalculator( this.worktimeCalc );
			// TODO move this to factory
			this.serverConnector = new ServerConnector( 'http://localhost:8080/time_entries.json', XMLHttpRequest );
		},
		onSettingsChanged: function( settings ) {
			var calendarDataGenerator = new CalendarDataGenerator( this.worktimeCalc );
			this.calendarData = calendarDataGenerator.generateData( settings.year, settings.month );
			this.hoursPerWeek = settings.hoursPerWeek;
			serverActions.load( { apiKey: settings.apiKey, account: settings.account } );
		},
		onLoad: function( credentials ) {
			if ( !this.serverConnector ) {
				throw Error( 'Uninitialized serverConnector' );
			}
			this.serverConnector.getData( serverActions.load.completed, serverActions.load.failed );
		},
		onLoadCompleted: function (result) {
			var agggregator = new TimeAggregator( result ),
				overtimeData = this.overtimeCalculator.getOvertime( agggregator.getAggregatedData(), this.hoursPerWeek );
			console.log("success!");
			console.log(this.calendarData);
			this.trigger( { calendarData: this.calendarData, overtimeData: overtimeData } );
		},
		onLoadFailed: function (result) {
			console.log("fail!");
			console.log(result);
		},
		serverConnector: null,
		calendarData: {},
		hoursPerWeek: 40

	} );

module.exports = entriesStore;