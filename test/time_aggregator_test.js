var expect = require('chai').expect
var TimeAggregator = require('../js/time_aggregator');

describe( 'TimeAggregator', function() {

	it( 'returns zero for empty data', function() {
		var testData = [],
			aggregator = new TimeAggregator( testData ),
			result = aggregator.getAggregatedData();
		expect( result.total ).to.equal( 0 );
	} );

	it( 'adds total minutes', function() {
		var testData = [
				{"time_entry":{"date_at":"2015-10-11","minutes":45}},
				{"time_entry":{"date_at":"2015-10-11","minutes":60}}
			],
			aggregator = new TimeAggregator( testData ),
			result = aggregator.getAggregatedData();
		expect( result.total ).to.equal( 105 );
	} );

	it( 'discards minutes from different months', function() {
		var testData = [
				{"time_entry":{"date_at":"2015-10-11","minutes":45}},
				{"time_entry":{"date_at":"2015-10-11","minutes":60}},
				{"time_entry":{"date_at":"2015-11-11","minutes":20}}
			],
			aggregator = new TimeAggregator( testData ),
			result = aggregator.getAggregatedData();
		expect( result.total ).to.equal( 105 );
	} );

	it( 'adds total minutes for each week', function() {
		// TODO Use German locale
		var testData = [
				{"time_entry":{"date_at":"2015-10-11","minutes":45}},
				{"time_entry":{"date_at":"2015-10-11","minutes":60}},
				{"time_entry":{"date_at":"2015-10-18","minutes":60}}
			],
			aggregator = new TimeAggregator( testData ),
			result = aggregator.getAggregatedData();
		expect( result.weeks ).to.have.all.keys( ["42", "43" ] );
		expect( result.weeks["42"].total ).to.equal( 105 );
		expect( result.weeks["43"].total ).to.equal( 60 );
	} );

} );