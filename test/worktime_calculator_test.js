/*jshint expr: true*/

var expect = require( 'chai' ).expect,
	WorktimeCalculator = require( '../js/worktime_calculator' ),
	moment = require( 'moment' );

// jscs:disable requireLineBreakAfterVariableAssignment
describe( 'WorktimeCalculator', function () {

	describe( '#getDaysForWeek (English locale)', function () {

		var calculator = new WorktimeCalculator( [ ] );

		it( 'returns all days for normal week', function () {
			// 4th-10th October 2015
			var week = 41, month = 9, result;
			moment.locale( 'en' );
			result = calculator.getDaysForWeek( week, month );
			expect( result.length ).to.equal( 7 );
			expect( result[ 0 ].isSame( moment( [ 2015, 9, 4 ] ) ) ).to.be.true;
			expect( result[ 6 ].isSame( moment( [ 2015, 9, 10 ] ) ) ).to.be.true;
		} );

		it( 'returns some days for first week in month', function () {
			// 27th September - 3rd October 2015, get days for October
			var week = 40, month = 9, result;
			moment.locale( 'en' );
			result = calculator.getDaysForWeek( week, month );
			expect( result.length ).to.equal( 3 );
			expect( result[ 0 ].isSame( moment( [ 2015, 9, 1 ] ) ) ).to.be.true;
			expect( result[ 2 ].isSame( moment( [ 2015, 9, 3 ] ) ) ).to.be.true;
		} );

		it( 'returns some days for last week in month', function () {
			// 30th August - 5th September 2015, get days for August
			var week = 36, month = 7;
			moment.locale( 'en' );
			result = calculator.getDaysForWeek( week, month );
			expect( result.length ).to.equal( 2 );
			expect( result[ 0 ].isSame( moment( [ 2015, 7, 30 ] ) ) ).to.be.true;
			expect( result[ 1 ].isSame( moment( [ 2015, 7, 31 ] ) ) ).to.be.true;
		} );
	
	} );

	describe( '#getWorkdaysForWeek (English locale)', function () {

		var calculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] );

		it( 'returns all days for normal week', function () {
			// 4th-10th October 2015
			var week = 41, month = 9;
			moment.locale( 'en' );
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.deep.equal( [ 5, 6, 7, 8, 9 ] );
		} );

		it( 'returns some days for first week in month', function () {
			// 27th September - 3rd October 2015, get days for October
			var week = 40, month = 9;
			moment.locale( 'en' );
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.deep.equal( [ 1, 2] );
		} );

		it( 'returns some days for last week in month', function () {
			// 30th August - 5th September 2015, get days for August
			var week = 36, month = 7;
			moment.locale( 'en' );
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.deep.equal( [ 31 ] );
		} );

		it( 'returns zero for months starting with a weekend', function () {
			// 27th July - 2nd August, get days for August
			var week = 31, month = 7;
			moment.locale( 'en' );
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.deep.equal( [] );
		} );

	} );

	describe( '#getWorkdaysForWeek (German locale)', function () {

		var calculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] );

		it( 'returns all days for normal week', function () {
			// 5th-11th October 2015
			var week = 41, month = 9;
			moment.locale( 'de' );
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.deep.equal( [ 5, 6, 7, 8, 9 ] );
		} );

		
		it( 'returns some days for first week in month', function () {
			// 29th September - 4th October 2015, get days for October
			var week = 40, month = 9;
			moment.locale( 'de' );
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.deep.equal( [ 1, 2 ] );
		} );

		it( 'returns some days for last week in month', function () {
			// 31th August - 6th September 2015, get days for August
			var week = 36, month = 7;
			moment.locale( 'de' );
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.deep.equal( [ 31 ] );
		} );

		it( 'returns empty array for months starting with a weekend', function () {
			// 27th July - 2nd August, get days for August
			var week = 31, month = 7;
			moment.locale( 'de' );
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.deep.equal( [] );
		} );
		
	} );

	describe( '#getWorktimes', function () {
		var calculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] ),
			hoursPerWeek = 40;

		it( 'calculates minutes and hours for normal week', function () {
			// 4th-10th October 2015
			var week = 41,
				month = 9,
				result;
			moment.locale( 'en' );
			result = calculator.getWorktimesForWeek( week, month, hoursPerWeek );
			expect( result.hoursPerDay ).to.equal( 8 );
			expect( result.minutesPerDay ).to.equal( 480 );
			expect( result.minutesPerWeek ).to.equal( 2400 );

		} );

		it( 'calculates minutes and hours for first week in month', function () {
			// 27th September - 3rd October 2015, get days for October
			var week = 40,
				month = 9,
				result;
			moment.locale( 'en' );
			result = calculator.getWorktimesForWeek( week, month, hoursPerWeek );
			expect( result.hoursPerDay ).to.equal( 8 );
			expect( result.hoursPerWeek ).to.equal( 16 );
			expect( result.minutesPerDay ).to.equal( 480 );
			expect( result.minutesPerWeek ).to.equal( 960 );
		} );

		it( 'calculates minutes and hours for last week in month', function () {
			// 30th August - 5th September 2015, get days for August
			var week = 36,
				month = 7,
				result;
			moment.locale( 'en' );
			result = calculator.getWorktimesForWeek( week, month, hoursPerWeek );
			expect( result.hoursPerDay ).to.equal( 8 );
			expect( result.hoursPerWeek ).to.equal( 8 );
			expect( result.minutesPerDay ).to.equal( 480 );
			expect( result.minutesPerWeek ).to.equal( 480 );
		} );

		it( 'returns zero for months starting with a weekend', function () {
			// 27th July - 2nd August, get days for August
			var week = 31,
				month = 7,
				result;
			moment.locale( 'en' );
			result = calculator.getWorktimesForWeek( week, month, hoursPerWeek );
			expect( result.hoursPerDay ).to.equal( 0 );
			expect( result.hoursPerWeek ).to.equal( 0 );
			expect( result.minutesPerDay ).to.equal( 0 );
			expect( result.minutesPerWeek ).to.equal( 0 );
		} );

	} );

	describe( '#isAWorkday', function () {

		var holiday = new Date( 2015, 11, 25 ),
			holidayFunction = function ( d ) { return d - holiday === 0; },
			calculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ], holidayFunction ),
			year = 2015,
			month = 9;

		it( 'returns true for configured workdays', function () {
			var day;
			// Monday, 5th of October
			moment.locale( 'en' );
			day = moment( [ year, month, 5 ] );
			expect( calculator.isAWorkday( day ) ).to.be.true;
		} );

		it( 'returns false for configured non-workdays (weekends)', function () {
			var day;
			// Sunday, 4th of October and Saturday, 3rd of October
			moment.locale( 'en' );
			day = moment( [ year, month, 3 ] );
			expect( calculator.isAWorkday( day ) ).to.be.false;
			day = moment( [ year, month, 4 ] );
			expect( calculator.isAWorkday( day ) ).to.be.false;
		} );

		it( 'returns false for holidays', function () {
			var day;
			// Christmas day
			moment.locale( 'en' );
			day = moment( [ year, 11, 24 ] );
			expect( calculator.isAWorkday( day ) ).to.be.true;
			day = moment( [ year, 11, 25 ] );
			expect( calculator.isAWorkday( day ) ).to.be.false;
		} );

	} );

} );
