var expect = require( 'chai' ).expect,
	moment = require( 'moment' ),
	DayTypes = require( '../js/domain/day_types' ),
	CalendarDataGenerator = require( '../js/calendar_data_generator' );

describe( 'CalendarDataGenerator', function () {

	describe( '#generateData, English locale', function () {

		var workweekStub = {
				isWorkDay: function ( date ) {
					// No Sundays and Saturdays
					return date.day() != 0 &&  date.day() != 6;
				}
			},
			generator = new CalendarDataGenerator( workweekStub, 'en' ),
			year = 2015,
			month = 9;

		moment.locale( 'en' );

		it( 'generates year and month info', function () {
			var result;
			result = generator.generateData( year, month );
			expect( result.year ).to.equal( 2015 );
			expect( result.month ).to.equal( 9 );
		} );

		it( 'generates weeks info', function () {
			var result;
			result = generator.generateData( year, month );
			expect( result.weeks ).to.have.all.keys( '40', '41', '42', '43', '44' );
		} );

		it( 'generates start and end dates for each week', function () {
			var result;
			result = generator.generateData( year, month );

			// Just spot-checking two dates
			expect( result.weeks[ '40' ].start.toISOString() ).to.equal( moment( '2015-09-27' ).toISOString() );
			expect( result.weeks[ '40' ].end.toISOString() ).to.equal( moment( '2015-10-03' ).toISOString() );

			expect( result.weeks[ '44' ].start.toISOString() ).to.equal( moment( '2015-10-25' ).toISOString() );
			expect( result.weeks[ '44' ].end.toISOString() ).to.equal( moment( '2015-10-31' ).toISOString() );

		} );

		it( 'generates day info', function () {
			var result;
			result = generator.generateData( year, month );
			expect( result.weeks[ 40 ].days ).to.have.all.keys( '1', '2', '3' );
			expect( result.weeks[ 41 ].days ).to.have.all.keys( '4', '5', '6', '7', '8', '9', '10' );
		} );

		it( 'generates different date objects for days', function () {
			var result;
			result = generator.generateData( year, month );
			expect( result.weeks[ 40 ].days[ 1 ] ).to.not.deep.equal( result.weeks[ 40 ].days[ 2 ] );
		} );

		it( 'includes workday info in day info', function () {
			var result;
			result = generator.generateData( year, month );
			expect( result.weeks[ 40 ].days[ 1 ].dayType ).to.equal( DayTypes.WORKDAY );
			expect( result.weeks[ 40 ].days[ 2 ].dayType ).to.equal( DayTypes.WORKDAY );
			expect( result.weeks[ 40 ].days[ 3 ].dayType ).to.equal( DayTypes.HOLIDAY );
			expect( result.weeks[ 41 ].days[ 4 ].dayType ).to.equal( DayTypes.HOLIDAY );
		} );

	} );
} );
