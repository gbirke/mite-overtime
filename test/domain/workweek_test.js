var expect = require( 'chai' ).expect,
	moment = require( 'moment'),
	WorkWeek = require( '../../js/domain/workweek' );

function createDateStub( dayOfWeek ) {
	return {
		day: function () {
			return dayOfWeek;
		}
	};
}

describe( 'WorkWeek', function () {

	var hoursPerWeek = 40,
		workdays = [ 1, 2, 3, 4, 5 ];

	it( 'can determine workdays', function () {
		var workWeek = WorkWeek.createWorkWeek( workdays, hoursPerWeek );
		expect( workWeek.isWorkDay( createDateStub( 1 ) ) ).to.equal( true );
		expect( workWeek.isWorkDay( createDateStub( 0 ) ) ).to.equal( false );
	} );

	it( 'can determine holidays with a holiday function', function () {
		var everyDayIsAHoliday = function () { return true; },
			workWeek = WorkWeek.createWorkWeek( workdays, hoursPerWeek, everyDayIsAHoliday );
		expect( workWeek.isWorkDay( createDateStub( 1 ) ) ).to.equal( false );
		expect( workWeek.isWorkDay( createDateStub( 2 ) ) ).to.equal( false );
		expect( workWeek.isWorkDay( createDateStub( 3 ) ) ).to.equal( false );
		expect( workWeek.isWorkDay( createDateStub( 4 ) ) ).to.equal( false );
		expect( workWeek.isWorkDay( createDateStub( 5 ) ) ).to.equal( false );
	} );

	it( 'can calculate hours per day', function () {
		var workWeek = WorkWeek.createWorkWeek( workdays, hoursPerWeek ),
			relaxedWeek = WorkWeek.createWorkWeek( workdays, 35 );
		expect( workWeek.getHoursPerDay() ).to.equal( 8 );
		expect( relaxedWeek.getHoursPerDay() ).to.equal( 7 );
	} );

	it( 'should return zero hours per day when there are no workdays', function () {
		var misconfiguredWorkWeek = WorkWeek.createWorkWeek( [], hoursPerWeek );
		expect( misconfiguredWorkWeek.getHoursPerDay() ).to.equal( 0 );
	} );

	it( 'returns days per week', function () {
		var workWeek = WorkWeek.createWorkWeek( workdays, hoursPerWeek );
		expect( workWeek.getDaysPerWeek() ).to.equal( 5 );
	} );

} );
