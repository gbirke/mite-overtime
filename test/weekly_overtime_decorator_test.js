var chai = require( 'chai' ),
    sinon = require( 'sinon' ),
    sinonChai = require( 'sinon-chai' ),
    moment = require( 'moment' ),
    WeeklyOvertimeDecorator = require( '../js/weekly_overtime_decorator' ),
    Day = require( '../js/domain/day' ),
	Week = require( '../js/domain/week' ),
    expect = chai.expect;

chai.use( sinonChai );

function createWeekStub( weekNumber, minutesWorked, daysWorked ) {
	return {
		weekNumber: weekNumber,
		getMinutesWorked: sinon.stub().returns( minutesWorked ),
		countDays: sinon.stub().returns( daysWorked )
	};
}

describe( 'WeeklyOvertimeDecorator', function () {

	it( 'should add the timedelta properties to weeks', function () {
		var firstWeek = createWeekStub( 40, 2400, 5 ),
		secondWeek = createWeekStub( 41, 2468, 5 ),
            weeks = {
	40: firstWeek,
	41: secondWeek
            },
            workWeek = {
	getHoursPerDay: sinon.stub().returns( 8 )
            },
            decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( workWeek );

		decorator.addOvertimeToEntries( weeks );

		expect( firstWeek ).to.have.property( 'timeDelta' );
		expect( firstWeek.timeDelta ).to.equal( 0 );

		expect( secondWeek ).to.have.property( 'timeDelta' );
		expect( secondWeek.timeDelta ).to.equal( 68 );

	} );

	it( 'should add the requiredMinutes properties to weeks', function () {
		var firstWeek = createWeekStub( 40, 2400, 5 ),
			secondWeek = createWeekStub( 41, 2468, 5 ),
			weeks = {
				40: firstWeek,
				41: secondWeek
			},
			workWeek = {
				getHoursPerDay: sinon.stub().returns( 8 )
			},
			decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( workWeek );

		decorator.addOvertimeToEntries( weeks );

		expect( firstWeek ).to.have.property( 'requiredMinutes' );
		expect( firstWeek.requiredMinutes ).to.equal( 2400 );

		expect( secondWeek ).to.have.property( 'requiredMinutes' );
		expect( secondWeek.requiredMinutes ).to.equal( 2400 );

	} );

	it( 'should allow a filter', function () {
		var days = {
			'2015-09-01': Day.createDay( moment( '2015-10-01' ) ),
			'2015-09-02': Day.createDay( moment( '2015-10-02' ) ),
			'2015-09-03': Day.createDay( moment( '2015-10-03' ) )
		},
            firstWeek = {
	weekNumber: 20,
	days: days,
	getMinutesWorked: sinon.stub().returns( 123 ),
	countDays: sinon.stub().returns( 3 )
            },
            weeks = {
	40: firstWeek
            },
			workWeek = {
				getHoursPerDay: sinon.stub().returns( 8 )
			},
            filter = sinon.stub(),
            decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( workWeek, filter );

		decorator.addOvertimeToEntries( weeks );

		expect( firstWeek.getMinutesWorked ).to.have.been.calledWith( filter );
	} );

	it( 'should stop counting days as missing after cutoff date', function () {
		var firstDay = Day.createWorkDay( moment( '2015-10-01' ) ),
			secondDay = Day.createWorkDay( moment( '2015-10-02' ) ),
			thirdDay = Day.createWorkDay( moment( '2015-10-03' ) ),

			firstWeek = Week.createWeek( moment( '2015-10-01' ) ),
			weeks = {
				40: firstWeek
			},
			workWeek = {
				getHoursPerDay: sinon.stub().returns( 8 )
			},
			cutoffDate = moment( '2015-10-02' ),
			decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( workWeek, null, cutoffDate );

		firstWeek.addDay( firstDay );
		firstWeek.addDay( secondDay );
		firstWeek.addDay( thirdDay );
		decorator.addOvertimeToEntries( weeks );

		expect( firstWeek.requiredMinutes ).to.equal( 480 );
	} );

} );
