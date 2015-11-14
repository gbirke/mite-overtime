var $ = jQuery = require( 'jQuery' ),
	SettingsActions = require( './actions/settings' ),
	SettingsController = require( './settings_controller' ),
	ServerConnector = require( './server_connector' ),
	CalendarDataGenerator = require( './calendar_data_generator' ),
	WorkTimeCalculator = require( './worktime_calculator' )
	OvertimeCalculator = require( './weekly_overtime_calculator' ),
	EntriesStore = require( './stores/entries' ),
	EntryView = require('./views/entry_view'),
	Bootstrap = require( 'bootstrap' );

$( function () {
	var serverConnector = ServerConnector.create( 'http://localhost:8080/time_entries.json', new XMLHttpRequest() ),
		worktimeCalculator = new WorkTimeCalculator( [ 1, 2, 3, 4, 5 ] ),
		calendarDataGenerator = new CalendarDataGenerator( worktimeCalculator ),
		overtimeCalculator = new OvertimeCalculator( worktimeCalculator, 40 ),
		entriesStore = EntriesStore.create( serverConnector, overtimeCalculator, calendarDataGenerator );

	SettingsActions.changeCredentials.listen( serverConnector.onChangeCredentials );
	EntryView.createAndInit( entriesStore );
	new SettingsController();
} );
