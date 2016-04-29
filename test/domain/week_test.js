var expect = require( 'chai' ).expect,
	Week = require( '../../js/domain/week' ),
	WEEK_NUMBER = 12;

function createDateStub() {
	return {
		week: function () {
			return WEEK_NUMBER;
		}
	};
}

function createMonthDateStub( monthNumber ) {
	return {
		month: function () {
			return monthNumber;
		}
	};
}

describe( 'Week', function () {

	it( 'has a default of zero work minutes', function () {
		var week = Week.createWeek( createDateStub() );
		expect( week.getMinutesWorked() ).to.equal( 0 );
	} );

	it( 'knows its week number', function () {
		var week = Week.createWeek( createDateStub() );
		expect( week.weekNumber ).to.equal( WEEK_NUMBER );
	} );

	it( 'calculates worktime of added days', function () {
		var firstDay = {
				date: 1,
				getMinutesWorked: function () { return 5; }
			},
			secondDay = {
				date: 2,
				getMinutesWorked: function () { return 5; }
			},
			week = Week.createWeek( createDateStub() );

		week.addDay( firstDay );
		week.addDay( secondDay );
		expect( week.getMinutesWorked() ).to.equal( 10 );
	} );

	it( 'calculates worktime of added days in a specific month', function () {
		var firstDay = {
					date: 30,
					dateObject: createMonthDateStub( 8 ),
					getMinutesWorked: function () { return 5; }
				},
				secondDay = {
					date: 1,
					dateObject: createMonthDateStub( 9 ),
					getMinutesWorked: function () { return 5; }
				},
				week = Week.createWeek( createDateStub() );

		week.addDay( firstDay );
		week.addDay( secondDay );
		expect( week.getMinutesWorkedInMonth( 9 ) ).to.equal( 5 );
	} );

	// TODO more sanity checks: Never add the same day twice, reject days not in the same month etc

} );
