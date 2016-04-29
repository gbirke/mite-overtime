var chai = require( 'chai' ),
    sinon = require( 'sinon' ),
    sinonChai = require( 'sinon-chai' ),
    moment = require( 'moment'),
    WeeklyOvertimeDecorator = require( '../js/weekly_overtime_decorator' ),
    Day = require( '../js/domain/day' ),
    expect = chai.expect;

chai.use( sinonChai );

function createWeekStub(weekNumber, minutesWorked ) {
    return {
        weekNumber: weekNumber,
        getMinutesWorked: sinon.stub().returns( minutesWorked )
    };
}


describe( 'WeeklyOvertimeDecorator', function () {

    var hoursPerWeek = 40;

    it( 'should add the timedelta property to weeks', function () {
        var firstWeek = createWeekStub( 40, 2400 ),
            secondWeek = createWeekStub( 41, 2468 ),
            weeks = {
                40: firstWeek,
                41: secondWeek
            },
            month = 9,
            worktimeCalculatorStub = {
                getWorktimesForWeek: sinon.stub().returns( {
                    minutesPerWeek: 2400
                } )
            },
            decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( worktimeCalculatorStub, hoursPerWeek );

        decorator.addOvertimeToEntries( weeks, month );

        expect( firstWeek ).to.have.property( 'timeDelta' );
        expect( firstWeek.timeDelta ).to.equal( 0 );

        expect( secondWeek ).to.have.property( 'timeDelta' );
        expect( secondWeek.timeDelta ).to.equal( 68 );

    } );

    it( 'should call the worktime calculator with week number, month and hours per week', function () {
        var firstWeek = createWeekStub( 20, 2400 ),
            weeks = {
                20: firstWeek,
            },
            month = 9,
            getWorktimesForWeek = sinon.stub().returns( {
                minutesPerWeek: 2400
            } ),
            worktimeCalculatorSpy = {
                getWorktimesForWeek: getWorktimesForWeek
            },
            decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( worktimeCalculatorSpy, hoursPerWeek );

        decorator.addOvertimeToEntries( weeks, month );

        expect( getWorktimesForWeek ).to.have.been.calledWith( 20, month, hoursPerWeek );

    } );

    it( 'should allow a filter', function () {
        var days = {
                '2015-09-01': Day.createDay( moment( '2015-10-01' ) ),
                '2015-09-02': Day.createDay( moment( '2015-10-02' ) ),
                '2015-09-03': Day.createDay( moment( '2015-10-03' ) ),
            },
            firstWeek = {
                weekNumber: 20,
                days: days,
                getMinutesWorked: sinon.stub().returns( 123 )
            },
            weeks = {
                40: firstWeek
            },
            month = 9,  // October
            worktimeCalculatorStub = {
                getWorktimesForWeek: sinon.stub().returns( {
                    minutesPerWeek: 2400
                } )
            },
            filter = sinon.stub(),
            decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( worktimeCalculatorStub, hoursPerWeek, filter );

        decorator.addOvertimeToEntries( weeks, month );

        expect( firstWeek.getMinutesWorked ).to.have.been.calledWith( filter );

    } );
} );
