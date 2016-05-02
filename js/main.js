var jQuery = require( 'jquery' ),
	SettingsActions = require( './actions/settings' ),
	Commands = require( './actions/commands' ),
	settingsStore = require( './stores/settings' ),
	ServerConnector = require( './server_connector' ),
	CalendarDataGenerator = require( './calendar_data_generator' ),
	WorkWeek = require( './domain/workweek' ),
	OvertimeFactory = require( './overtime_factory' ),
	HtmlRenderer = require( './html_renderer' ),
	DateStore = require( './stores/date' ),
	EntriesStore = require( './stores/entries' ),
	errorStore = require( './stores/errors' ),
	EntryView = require( './views/entry_view' ),
	ErrorView = require( './views/error_view' ),
	SettingsView = require( './views/settings_view' ),
	config = require( './config' );

jQuery( function () {
	var serverConnector = ServerConnector.create( settingsStore, new XMLHttpRequest() ),
		workWeek = WorkWeek.createWorkWeek( [ 1, 2, 3, 4, 5 ], 40 ), // TODO make hours per week dynamic from settingsStore
		calendarDataGenerator = new CalendarDataGenerator( workWeek ),
		overtimeFactory = OvertimeFactory.createOvertimeFactory( workWeek, 'de' ), // TODO make locale configurable
		entriesStore = EntriesStore.create( serverConnector, overtimeFactory, calendarDataGenerator, DateStore );

	SettingsActions.changeApiUrl( config.apiURL );
	errorStore.init();
	DateStore.init( config.startDate );
	EntryView.createAndInit( new HtmlRenderer( '#displayContainer' ), entriesStore );
	ErrorView.createAndInit( jQuery( '#errorModal' ), errorStore );
	SettingsView.createAndInit( jQuery, SettingsActions, Commands );
} );
