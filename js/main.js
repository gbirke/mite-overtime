var HtmlRenderer = require( './html_renderer' ),
	ServerConnector = require( './server_connector' ),
	TimeAggregator = require( './time_aggregator' ),
	OvertimeCalculator = require( './overtime_calculator' ),
	DataConverter = require( './data_converter' ),
	testData = [ {
		total: 80,
		weeks: [
			{ total: 100, number: 42 },
			{ total: -20, number: 43 }
		]
	} ],
	connector = new ServerConnector( 'http://localhost:8080/time_entries.json', XMLHttpRequest );

connector.getData( function ( data ) {
	var agggregator = new TimeAggregator( data ),
		overtime = new OvertimeCalculator(),
		converter = new DataConverter(),
		renderer = new HtmlRenderer(),
		overtimeData, convertedData;
	// console.log( agggregator.getAggregatedData() );
	overtimeData = overtime.getOvertime( agggregator.getAggregatedData( data ), 480 );
	convertedData = converter.convert( overtimeData );
	// console.log( convertedData );
	renderer.render( convertedData );

} );

