var jQuery = require( 'jquery' ),
	SettingsActions = require( './actions/settings' ),
	Commands = require( './actions/commands' ),
	SettingsStore = require( './stores/settings' ),
	ServerConnector = require( './server_connector' ),
	CalendarDataGenerator = require( './calendar_data_generator' ),
	OvertimeFactory = require( './overtime_factory' ),
	HtmlRenderer = require( './html_renderer' ),
	CalendarDataStore = require( './stores/calendar_data'),
	DateStore = require( './stores/date' ),
	EntriesStore = require( './stores/entries' ),
	WorkWeekStore = require( './stores/workweek'),
	errorStore = require( './stores/errors' ),
	EntryView = require( './views/entry_view' ),
	ErrorView = require( './views/error_view' ),
	SettingsView = require( './views/settings_view' ),
	PaginationView = require( './views/pagination_view' ),
	config = require( './config' );

jQuery( function () {
	var locale = 'de', // TODO make locale configurable
		// load locale object to make browserify include locale data
		loadedLocale = require( 'moment/locale/de' ), // see https://github.com/moment/moment/issues/2007
		serverConnector = ServerConnector.create( SettingsStore, new XMLHttpRequest() ),
		workWeekStore = WorkWeekStore.create( SettingsStore),
		calendarDataStore =	CalendarDataStore.create( DateStore, SettingsStore, workWeekStore),
		overtimeFactory = OvertimeFactory.createOvertimeFactory( workWeekStore.workWeek, locale ),
		entriesStore = EntriesStore.create( serverConnector, overtimeFactory, calendarDataStore );

	SettingsActions.changeApiUrl( config.apiURL );
	errorStore.init();
	EntryView.createAndInit( new HtmlRenderer( '#displayContainer' ), entriesStore );
	ErrorView.createAndInit( jQuery( '#errorModal' ), errorStore );
	SettingsView.createAndInit( jQuery, SettingsActions );
	PaginationView.createAndInit( jQuery( '#nav-prev a' ), jQuery( '#nav-next a' ), DateStore, Commands );
	Commands.setDate( config.startDate );
} );
