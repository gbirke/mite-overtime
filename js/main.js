var jQuery = require( 'jQuery' ),
	SettingsActions = require( './actions/settings' ),
	Commands = require( './actions/commands' ),
	settingsStore = require( './stores/settings' ),
	ServerConnector = require( './server_connector' ),
	CalendarDataGenerator = require( './calendar_data_generator' ),
	WorkTimeCalculator = require( './worktime_calculator' ),
	OvertimeCalculator = require( './weekly_overtime_calculator' ),
	HtmlRenderer = require( './html_renderer' ),
	DateStore = require( './stores/date' ),
	EntriesStore = require( './stores/entries' ),
	errorStore = require( './stores/errors' ),
	EntryView = require( './views/entry_view' ),
	ErrorView = require( './views/error_view' ),
	SettingsView = require( './views/settings_view' ),
	config = require( './config' ),
	Bootstrap = require( 'bootstrap' );

$( function () {
	var serverConnector = ServerConnector.create( settingsStore, new XMLHttpRequest() ),
		worktimeCalculator = new WorkTimeCalculator( [ 1, 2, 3, 4, 5 ] ),
		calendarDataGenerator = new CalendarDataGenerator( worktimeCalculator ),
		overtimeCalculator = new OvertimeCalculator( worktimeCalculator, settingsStore ),
		entriesStore = EntriesStore.create( serverConnector, overtimeCalculator, calendarDataGenerator, DateStore );

	// TODO: Check environment vars and set API url accordingly
	// Real API URL: https://corsapi.mite.yo.lk/time_entries.json
	SettingsActions.changeApiUrl( config.apiURL );
	errorStore.init();
	DateStore.init( config.startDate );
	EntryView.createAndInit( new HtmlRenderer( '#displayContainer' ), entriesStore );
	ErrorView.createAndInit( jQuery( '#errorModal' ), errorStore );
	SettingsView.createAndInit( jQuery, SettingsActions, Commands );
} );
