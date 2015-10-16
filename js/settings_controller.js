var $ = require( 'jQuery' ),
	HtmlRenderer = require( './html_renderer' ),
	ServerConnector = require( './server_connector' ),
	TimeAggregator = require( './time_aggregator' ),
	OvertimeCalculator = require( './overtime_calculator' ),
	DataConverter = require( './data_converter' );

function SettingsController() {

	$( '#submit_settings' ).on( 'click', function () {
		var apiKey = $( '#api_key' ).val(),
			account = $( '#account' ).val(),
			hoursPerDay = $( '#hours_per_day' ).val(),
			connector = new ServerConnector( 'https://corsapi.mite.yo.lk/time_entries.json', XMLHttpRequest, {
					'X-MiteAccount': account,
					'X-MiteApiKey': apiKey
				}
			);
		// for debugging: 	connector = new ServerConnector( 'http://localhost:8080/time_entries.json', XMLHttpRequest );

		connector.getData( function ( data ) {
			var agggregator = new TimeAggregator( data ),
				overtime = new OvertimeCalculator(),
				converter = new DataConverter(),
				renderer = new HtmlRenderer(),
				overtimeData, convertedData;
			overtimeData = overtime.getOvertime( agggregator.getAggregatedData( data ), 480 );
			convertedData = converter.convert( overtimeData );
			renderer.render( convertedData );
		} ); // end callback for data
	} ); // end onclick handler
}

module.exports = SettingsController;
