import CalendarDataGenerator from '../js/domain_calendar_data_generator';
import Week from '../js/domain/Week'

var expect = require( 'chai' ).expect,
	moment = require( 'moment' ),
	DayTypes = require( '../js/domain/day_types' );

describe( 'CalendarDataGenerator', function () {

	describe( '#getMonth, German locale', function () {

		var workweekStub = {
				isWorkDay: function ( date ) {
					// No Sundays and Saturdays
					return date.day() !== 0 && date.day() !== 6;
				}
			},
			generator = new CalendarDataGenerator( workweekStub, 'de' ),
			year = 2015,
			month = 9; // October

		it( 'generates year and month info', function () {
			var result = generator.getMonth( year, month );
			expect( result.year ).to.equal( year );
			expect( result.monthNumber ).to.equal( month );
		} );


		it( 'generates weeks info', function () {
			var result = generator.getMonth( year, month );
			expect( result.weeks ).to.have.all.keys( '2015-40', '2015-41', '2015-42', '2015-43', '2015-44' );
		} );


		it( 'generates day info', function () {
			var result = generator.getMonth( year, month );
			expect( result.weeks[ '2015-40' ].days ).to.have.all.keys( '2015-10-01', '2015-10-02', '2015-10-03', '2015-10-04' );
			expect( result.weeks[ '2015-41' ].days ).to.have.all.keys(
				'2015-10-05',
				'2015-10-06',
				'2015-10-07',
				'2015-10-08',
				'2015-10-09',
				'2015-10-10',
				'2015-10-11'
			);
		} );


		it( 'generates different date objects for days', function () {
			var result = generator.getMonth( year, month );
			expect( result.weeks[ '2015-40' ].days[ '2015-10-01' ] ).to.not.deep.equal( result.weeks[ '2015-40' ].days[ '2015-10-02' ] );
		} );

		it( 'includes workday info in day info', function () {
			var result = generator.getMonth( year, month );
			expect( result.weeks[ '2015-40' ].days[ '2015-10-01' ].type ).to.equal( DayTypes.WORKDAY );
			expect( result.weeks[ '2015-40' ].days[ '2015-10-02' ].type ).to.equal( DayTypes.WORKDAY );
			expect( result.weeks[ '2015-40' ].days[ '2015-10-03' ].type ).to.equal( DayTypes.HOLIDAY );
			expect( result.weeks[ '2015-40' ].days[ '2015-10-04' ].type ).to.equal( DayTypes.HOLIDAY );
		} );

	} );

	describe( '#getMonth, January with some week days in December', function () {

		var workweekStub = {
				isWorkDay: function ( date ) {
					// No Sundays and Saturdays
					return date.day() !== 0 && date.day() !== 6;
				}
			},
			generator = new CalendarDataGenerator( workweekStub, 'de' ),
			year = 2016,
			month = 0; // January

		it( 'generates weeks info', function () {
			var result = generator.getMonth( year, month );
			expect( result.weeks ).to.have.all.keys( '2016-53', '2016-01', '2016-02', '2016-03', '2016-04' );
		} );


		it( 'generates days info for first week', function () {
			var result = generator.getMonth( year, month );
			expect( result.weeks[ '2016-53' ].days ).to.have.all.keys( '2016-01-01', '2016-01-02', '2016-01-03');
		} );

	} );
} );
