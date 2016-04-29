// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

var expect = require( 'chai' ).expect,
	Converter = require( '../js/entries_to_days_converter' ),
	workWeekCalculatorStub = {
		isWorkDay: function () {
			return true;
		}
	};

describe( 'EntriesToDaysConverter', function () {

	it( 'returns zero for empty data', function () {
		var testData = [],
			converter = Converter.createEntriesToDaysConverter( workWeekCalculatorStub ),
			result = converter.getDaysFromEntries( testData );
		expect( result ).to.deep.equal( {} );
	} );

	it( 'adds minutes from the same day', function () {
		var testData = [
				{ time_entry: { date_at: '2015-10-11', minutes: 45 } },
				{ time_entry: { date_at: '2015-10-11', minutes: 60 } }
			],
			converter = Converter.createEntriesToDaysConverter( workWeekCalculatorStub ),
			result = converter.getDaysFromEntries( testData );
		expect( result ).to.have.keys( [ '2015-10-11' ] );
		expect( result[ '2015-10-11' ].getMinutesWorked() ).to.equal( 105 );
	} );

	it( 'generates day objects for different days', function () {
		var testData = [
				{ time_entry: { date_at: '2015-10-11', minutes: 45 } },
				{ time_entry: { date_at: '2015-10-12', minutes: 60 } }
			],
			converter = Converter.createEntriesToDaysConverter( workWeekCalculatorStub ),
			result = converter.getDaysFromEntries( testData );
		expect( result ).to.have.keys( [ '2015-10-11', '2015-10-12' ] );
		expect( result[ '2015-10-11' ].getMinutesWorked() ).to.equal( 45 );
		expect( result[ '2015-10-12' ].getMinutesWorked() ).to.equal( 60 );
	} );

	it( 'adds minutes from running trackers', function () {
		var testData = [
				{ time_entry: { date_at: '2015-10-11', minutes: 45, tracking: {
					minutes: 80
				} } },
				{ time_entry: { date_at: '2015-10-11', minutes: 60 } }
			],
			converter = Converter.createEntriesToDaysConverter( workWeekCalculatorStub ),
			result = converter.getDaysFromEntries( testData );
		expect( result ).to.have.keys( [ '2015-10-11' ] );
		expect( result[ '2015-10-11' ].getMinutesWorked() ).to.equal( 140 );
	} );

} );
