var chai = require( 'chai' ),
    sinon = require( 'sinon' ),
    sinonChai = require( 'sinon-chai' ),
    WeeklyOvertimeDecorator = require( '../js/weekly_overtime_decorator' ),
    expect = chai.expect;

chai.use( sinonChai );

function createWeek( weekNumber, minutesWorked ) {
    return {
        weekNumber: weekNumber,
        getMinutesWorkedInMonth: sinon.stub().returns( minutesWorked )
    };
}


describe( 'WeeklyOvertimeDecorator', function () {

    var hoursPerWeek = 40;

    it( 'should add the timedelta property to weeks', function () {
        var firstWeek = createWeek( 40, 2400 ),
            secondWeek = createWeek( 41, 2468 ),
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
        var firstWeek = createWeek( 20, 2400 ),
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


} );
