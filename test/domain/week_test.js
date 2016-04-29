var expect = require( 'chai' ).expect,
	moment = require( 'moment'),
	Week = require( '../../js/domain/week' ),
	WEEK_NUMBER = 12;

function createDateStub() {
	return {
		week: function () {
			return WEEK_NUMBER;
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
				dateObject: moment( '2015-10-01' ),
				getMinutesWorked: function () { return 5; }
			},
			secondDay = {
				date: 2,
				dateObject: moment( '2015-10-02' ),
				getMinutesWorked: function () { return 5; }
			},
			week = Week.createWeek( createDateStub() );

		week.addDay( firstDay );
		week.addDay( secondDay );
		expect( week.getMinutesWorked() ).to.equal( 10 );
	} );

	it( 'can count days with filtering', function () {
		var firstDay = {
					date: 30,
					dateObject: moment( '2015-09-30' ),
					getMinutesWorked: function () { return 5; }
				},
				secondDay = {
					date: 1,
					dateObject: moment( '2015-10-01' ),
					getMinutesWorked: function () { return 5; }
				},
				week = Week.createWeek( createDateStub()),
				verySpecificFilter= function ( days ) {
					return { '2015-09-30': firstDay };
				}
			;

		week.addDay( firstDay );
		week.addDay( secondDay );

		expect( week.countDays( verySpecificFilter ) ).to.equal( 1 );
	} );

	it( 'can add missing days', function () {
		var firstDay = {
				date: 1,
				dateObject: moment( '2015-10-01' ),
				getMinutesWorked: function () { return 5; }
			},
			week = Week.createWeek( moment( '2015-10-01' )),
			filterStub = function ( day ) { return day; },
			workWeek = { isWorkDay: function () { return true; } }
				;

		week.addDay( firstDay );
		week.addMissingDays( workWeek );

		expect( week.countDays( filterStub ) ).to.equal( 7 );
		expect( week.getMinutesWorked()).to.equal( 5 );


	} );



	// TODO more sanity checks: Never add the same day twice, reject days not in the same month etc

} );
