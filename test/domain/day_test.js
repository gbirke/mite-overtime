var expect = require( 'chai' ).expect,
	Day = require( '../../js/domain/day' ),
	DATE = 23;

function createDateStub() {
	return {
		date: function () {
			return DATE;
		}
	};
}

describe( 'Day', function () {

	it( 'has a default of zero work minutes', function () {
		var day = Day.createWorkDay( createDateStub() );
		expect( day.getMinutesWorked() ).to.equal( 0 );
	} );

	it( 'can add more work minutes', function () {
		var day = Day.createWorkDay( createDateStub() );

		day.addWorkMinutes( 5 );
		day.addWorkMinutes( 15 );
		expect( day.getMinutesWorked() ).to.equal( 20 );
	} );

	it( 'get initialized with the date', function () {
		var day = Day.createWorkDay( createDateStub() );
		expect( day.date ).to.equal( DATE );
	} );

} );
