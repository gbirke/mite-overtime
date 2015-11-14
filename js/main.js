var $ = jQuery = require( 'jQuery' ),
	SettingsActions = require( './actions/settings' ),
	settingsStore = require( './stores/settings' ),
	SettingsController = require( './settings_controller' ),
	ServerConnector = require( './server_connector' ),
	CalendarDataGenerator = require( './calendar_data_generator' ),
	WorkTimeCalculator = require( './worktime_calculator' )
	OvertimeCalculator = require( './weekly_overtime_calculator' ),
	HtmlRenderer = require( './html_renderer' ),
	EntriesStore = require( './stores/entries' ),
	errorStore = require( './stores/errors' ),
	EntryView = require( './views/entry_view' ),
	ErrorView = require( './views/error_view' ),
	Bootstrap = require( 'bootstrap' );

$( function () {
	var serverConnector = ServerConnector.create( settingsStore, new XMLHttpRequest() ),
		worktimeCalculator = new WorkTimeCalculator( [ 1, 2, 3, 4, 5 ] ),
		calendarDataGenerator = new CalendarDataGenerator( worktimeCalculator ),
		overtimeCalculator = new OvertimeCalculator( worktimeCalculator, settingsStore ),
		entriesStore = EntriesStore.create( serverConnector, overtimeCalculator, calendarDataGenerator );

	// TODO: Check environment vars and set API url accordingly
	SettingsActions.changeApiUrl( 'http://localhost:8080/time_entries.json' );
	errorStore.init();
	EntryView.createAndInit( new HtmlRenderer( '#displayContainer' ), entriesStore );
	ErrorView.createAndInit( $( '#errorModal' ), errorStore );
	new SettingsController();
} );
