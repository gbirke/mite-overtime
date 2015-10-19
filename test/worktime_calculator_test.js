var expect = require( 'chai' ).expect,
	WorktimeCalculator = require( '../js/worktime_calculator' ),
	moment = require( 'moment' );

// jscs:disable requireLineBreakAfterVariableAssignment
describe( 'WorktimeCalculator', function () {

	describe( '#getWorkdays (English locale)', function () {

		var calculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] );
		moment.locale( 'en' );

		it( 'returns all days for normal week', function () {
			// 4th-10th October 2015
			var week = 41, month = 9;
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.equal( 5 );
		} );

		it( 'returns some days for first week in month', function () {
			// 27th September - 3d October 2015, get days for October
			var week = 40, month = 9;
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.equal( 2 );
		} );

		it( 'returns some days for last week in month', function () {
			// 30th August - 5th September 2015, get days for August
			var week = 36, month = 7;
			expect( calculator.getWorkdaysForWeek( week, month ) ).to.equal( 1 );
		} );

	} );

	describe( '#getWorktimes', function () {
		var calculator = new WorktimeCalculator( [ 1, 2, 3, 4, 5 ] ),
			hoursPerWeek = 40;
		moment.locale( 'en' );

		it( 'calculates minutes and hours for normal week', function () {
			// 4th-10th October 2015
			var week = 41,
				month = 9,
				result = calculator.getWorktimesForWeek( week, month, hoursPerWeek );
			expect( result.hoursPerDay ).to.equal( 8 );
			expect( result.minutesPerDay ).to.equal( 480 );
			expect( result.minutesPerWeek ).to.equal( 2400 );

		} );

		it( 'calculates minutes and hours for first week in month', function () {
			// 27th September - 3d October 2015, get days for October
			var week = 40,
				month = 9,
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
				result = calculator.getWorktimesForWeek( week, month, hoursPerWeek );
			expect( result.hoursPerDay ).to.equal( 8 );
			expect( result.hoursPerWeek ).to.equal( 8 );
			expect( result.minutesPerDay ).to.equal( 480 );
			expect( result.minutesPerWeek ).to.equal( 480 );
		} );

	} );

	// TODO describe( '#getWorkdays (German locale)', function () {

} );
