import Week from '../../js/domain/week';

var expect = require( 'chai' ).expect,
	moment = require( 'moment' ),
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
		var week = new Week( createDateStub() );
		expect( week.getMinutesWorked() ).to.equal( 0 );
	} );

	it( 'knows its week number', function () {
		var week = new Week( createDateStub() );
		expect( week.weekNumber ).to.equal( WEEK_NUMBER );
	} );

	it( 'calculates worktime of added days', function () {
		var firstDay = {
				date: 1,
				dateObject: moment( '2015-10-01' ),
				getMinutesWorked: function () { return 5; },
				getKey: function () { return '2015-10-01' }
			},
			secondDay = {
				date: 2,
				dateObject: moment( '2015-10-02' ),
				getMinutesWorked: function () { return 5; },
				getKey: function () { return '2015-10-02' }
			},
			week = new Week( createDateStub() );

		week.addDay( firstDay );
		week.addDay( secondDay );
		expect( week.getMinutesWorked() ).to.equal( 10 );
	} );

	it( 'can count days with filtering', function () {
		var firstDay = {
					date: 30,
					dateObject: moment( '2015-09-30' ),
					getMinutesWorked: function () { return 5; },
					getKey: function () { return '2015-09-30' }
				},
				secondDay = {
					date: 1,
					dateObject: moment( '2015-10-01' ),
					getMinutesWorked: function () { return 5; },
					getKey: function () { return '2015-10-02' }
				},
				week = new Week( createDateStub() ),
				verySpecificFilter = function ( days ) {
					return { '2015-09-30': firstDay };
				}
			;

		week.addDay( firstDay );
		week.addDay( secondDay );

		expect( week.countDays( verySpecificFilter ) ).to.equal( 1 );
	} );

	// TODO more sanity checks: Never add the same day twice, reject days not in the same month etc

} );
