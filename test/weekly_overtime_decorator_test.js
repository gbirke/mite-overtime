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

    it( 'should filter the days by month', function () {
        var days = {
                '2015-08-30': Day.createDay( moment( '2015-08-30' ) ),
                '2015-09-01': Day.createDay( moment( '2015-09-01' ) ),
                '2015-09-02': Day.createDay( moment( '2015-09-01' ) ),
            },
            firstWeek = {
                weekNumber: 20,
                days: days,
                getMinutesWorked: sinon.spy()
            },
            weeks = {
                40: firstWeek
            },
            month = 8,  // September
            worktimeCalculatorStub = {
                getWorktimesForWeek: sinon.stub().returns( {
                    minutesPerWeek: 2400
                } )
            },
            decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( worktimeCalculatorStub, hoursPerWeek ),
            filteredDays;

        decorator.addOvertimeToEntries( weeks, month );

        filteredDays = firstWeek.getMinutesWorked.firstCall.args[ 0 ]( days );

        expect( filteredDays ).to.have.all.keys( [ '2015-09-01', '2015-09-02' ] );
        expect( filteredDays ).not.to.have.key( '2015-08-30' );

    } );

    it( 'should allow our own filter', function () {
        var days = {
                '2015-09-01': Day.createDay( moment( '2015-09-01' ) ),
                '2015-09-02': Day.createDay( moment( '2015-09-02' ) ),
                '2015-09-03': Day.createDay( moment( '2015-09-03' ) ),
            },
            firstWeek = {
                weekNumber: 20,
                days: days,
                getMinutesWorked: sinon.spy()
            },
            weeks = {
                40: firstWeek
            },
            month = 8,  // September
            worktimeCalculatorStub = {
                getWorktimesForWeek: sinon.stub().returns( {
                    minutesPerWeek: 2400
                } )
            },
            filter = sinon.spy(),
            decorator = WeeklyOvertimeDecorator.createWeeklyOvertimeDecorator( worktimeCalculatorStub, hoursPerWeek, filter );

        decorator.addOvertimeToEntries( weeks, month );

        // Call filter argument
        firstWeek.getMinutesWorked.firstCall.args[ 0 ]( days );

        expect( filter ).to.have.been.calledWith( days );

    } );
} );
