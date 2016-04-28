var expect = require( 'chai' ).expect,
	moment = require( 'moment' ),
	Day = require( '../../js/domain/day' );

describe( 'Day', function () {

	it( 'has a default of zero work minutes', function () {
		var day = Day.createWorkDay( moment() );
		expect( day.minutesWorked ).to.equal( 0 );
	} );

	it( 'can add more work minutes', function () {
		var day = Day.createWorkDay( moment() );

		day.addWorkMinutes( 5 );
		day.addWorkMinutes( 15 );
		expect( day.minutesWorked ).to.equal( 20 );
	} );

} );
