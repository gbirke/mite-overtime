var expect = require( 'chai' ).expect,
	moment = require( 'moment' ),
	DayTypes = require( '../js/day_types' ),
	WorktimeCalculator = require( '../js/worktime_calculator' ),
	CalendarDataGenerator = require( '../js/calendar_data_generator' );

describe( 'CalendarDataGenerator', function () {

	describe( '#generateData, English locale', function () {

		var worktime = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] ),
			generator = new CalendarDataGenerator( worktime ),
			year = 2015,
			month = 9;

		it( 'generates year and month info', function () {
			var result;
			moment.locale( 'en' );
			result = generator.generateData( year, month );
			expect( result.year ).to.equal( 2015 );
			expect( result.month ).to.equal( 9 );
		} );

		it( 'generates weeks info', function () {
			var result;
			moment.locale( 'en' );
			result = generator.generateData( year, month );
			expect( result.weeks ).to.have.all.keys( '40', '41', '42', '43', '44' );
		} );

		it( 'generates day info', function () {
			var result;
			moment.locale( 'en' );
			result = generator.generateData( year, month );
			expect( result.weeks[ 40 ].days ).to.have.all.keys( '1', '2', '3' );
			expect( result.weeks[ 41 ].days ).to.have.all.keys( '4', '5', '6', '7', '8', '9', '10' );
		} );

		it( 'generates different date objects for days', function () {
			var result;
			moment.locale( 'en' );
			result = generator.generateData( year, month );
			expect( result.weeks[ 40 ].days[ 1 ] ).to.not.deep.equal( result.weeks[ 40 ].days[ 2 ] );
		} );

		it( 'includes workday info in day info', function () {
			var result;
			moment.locale( 'en' );
			result = generator.generateData( year, month );
			expect( result.weeks[ 40 ].days[ 1 ].dayType ).to.equal( DayTypes.WORKDAY );
			expect( result.weeks[ 40 ].days[ 2 ].dayType ).to.equal( DayTypes.WORKDAY );
			expect( result.weeks[ 40 ].days[ 3 ].dayType ).to.equal( DayTypes.HOLIDAY );
			expect( result.weeks[ 41 ].days[ 4 ].dayType ).to.equal( DayTypes.HOLIDAY );
		} );

	} );
} );
