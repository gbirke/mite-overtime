var $ = jQuery = require( 'jQuery' ),
	SettingsController = require( './settings_controller' ),
	ServerConnector = require( './server_connector' ),
	CalendarDataGenerator = require( './calendar_data_generator' ),
	WorkTimeCalculator = require( './worktime_calculator' )
	OvertimeCalculator = require( './weekly_overtime_calculator' ),
	EntriesStore = require( './stores/entries' ),
	EntryView = require('./views/entry_view'),
	Bootstrap = require( 'bootstrap' );

$( function () {
	var serverConnector = new ServerConnector( 'http://localhost:8080/time_entries.json', XMLHttpRequest ),
		worktimeCalculator = new WorkTimeCalculator( [ 1, 2, 3, 4, 5 ] ),
		calendarDataGenerator = new CalendarDataGenerator( worktimeCalculator ),
		overtimeCalculator = new OvertimeCalculator( worktimeCalculator, 40 ),
		entriesStore = EntriesStore.create( serverConnector, overtimeCalculator, calendarDataGenerator );

	EntryView.createAndInit( entriesStore );
	new SettingsController();
} );
