var expect = require( 'chai' ).expect,
	Week = require( '../../js/domain/week' ),
	WEEK_NUMBER = 12;

function createDateStub() {
	return {
		week: function () {
			return WEEK_NUMBER;
		}
	}
}

describe( 'Week', function () {

	it( 'has a default of zero work minutes', function () {
		var week = Week.createWeek( createDateStub() );
		expect( week.minutesWorked ).to.equal( 0 );
	} );

	it( 'knows its week number', function () {
		var week = Week.createWeek( createDateStub() );
		expect( week.weekNumber ).to.equal( WEEK_NUMBER );
	} );

	it( 'calculates worktime of added days', function () {
		var firstDay = {
				date: 1,
				minutesWorked: 5
			},
			secondDay = {
				date: 1,
				minutesWorked: 5
			},
			week = Week.createWeek( createDateStub() );

		week.addDay( firstDay );
		week.addDay( secondDay );
		expect( week.minutesWorked ).to.equal( 10 );
	} );

	// TODO more sanity checks: Never add the same day twice, reject days not in the same month etc

} );
