var objectAssign = require( 'object-assign' ),
    _ = require( 'lodash'),
    WeeklyOvertimeDecorator = {
        worktimeCalculator: null,
        hoursPerWeek: 0,
        addOvertimeToEntries: function ( weeks, month ) {
            var self = this;
            _.each( weeks, function ( week ) {
                var worktimes = self.worktimeCalculator.getWorktimesForWeek( week.weekNumber, month, self.hoursPerWeek);
                week.timeDelta = week.getMinutesWorked() - worktimes.minutesPerWeek;
            } );
        }
    };


module.exports = {
    createWeeklyOvertimeDecorator: function ( worktimeCalculator, hoursPerWeek ) {
        return objectAssign( Object.create( WeeklyOvertimeDecorator ), {
            worktimeCalculator: worktimeCalculator,
            hoursPerWeek: hoursPerWeek,
        } );
    }
};