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
		var testData = [
				{"time_entry":{"date_at":"2015-10-13","minutes":45}},
				{"time_entry":{"date_at":"2015-10-13","minutes":60}},
				{"time_entry":{"date_at":"2015-10-20","minutes":60}}
			],
			aggregator = new TimeAggregator( testData ),
			result = aggregator.getAggregatedData();
		expect( result.weeks ).to.have.all.keys( ["42", "43" ] );
		expect( result.weeks["42"].total ).to.equal( 105 );
		expect( result.weeks["43"].total ).to.equal( 60 );
	} );

	it( 'can use different locales for week start dates', function() {
		// 2015-10-11 is a Sunday (Week 41), 2015-10-15 is a Thursday (Week 42) 
		var testData = [
				{"time_entry":{"date_at":"2015-10-11","minutes":45}},
				{"time_entry":{"date_at":"2015-10-11","minutes":60}},
				{"time_entry":{"date_at":"2015-10-15","minutes":60}}
			],
			aggregator = new TimeAggregator( testData, 'de' ),
			result = aggregator.getAggregatedData();
		expect( result.weeks ).to.have.all.keys( ["41", "42" ] );
		expect( result.weeks["41"].total ).to.equal( 105 );
		expect( result.weeks["42"].total ).to.equal( 60 );
	} );

} );
