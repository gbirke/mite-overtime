var expect = require( 'chai' ).expect,
	Month = require( '../../js/domain/month' ),
	MONTH_NUMBER = 7;

function createDateStub() {
	return {
		month: function () {
			return MONTH_NUMBER;
		}
	}
}

describe( 'Month', function () {

	it( 'has a default of zero work minutes', function () {
		var month = Month.createMonth( createDateStub() );
		expect( month.getMinutesWorked() ).to.equal( 0 );
	} );

	it( 'knows its month number', function () {
		var month = Month.createMonth( createDateStub() );
		expect( month.monthNumber ).to.equal( MONTH_NUMBER );
	} );

	it( 'calculates worktime of added week', function () {
		var firstWeek = {
				weekNumber: 1,
				getMinutesWorked: function () { return 500; }
			},
			secondWeek = {
				weekNumber: 2,
				getMinutesWorked: function () { return 600; }
			},
			month = Month.createMonth( createDateStub() );

		month.addWeek( firstWeek );
		month.addWeek( secondWeek );
		expect( month.getMinutesWorked() ).to.equal( 1100 );
	} );

	// TODO more sanity checks: Never add the same week twice, reject weeks not in the same month etc

} );
