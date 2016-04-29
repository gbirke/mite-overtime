var objectAssign = require( 'object-assign' ),
    _ = require( 'lodash'),
    DayFilter = require( './day_filter' ),
    WeeklyOvertimeDecorator = {
        worktimeCalculator: null,
        hoursPerWeek: 0,
        filter: null,
        addOvertimeToEntries: function ( weeks, month ) {
            var self = this,
                monthFilter = DayFilter.byMonth( month),
                filter = DayFilter.combine( monthFilter, this.filter );
            _.each( weeks, function ( week ) {
                var worktimes = self.worktimeCalculator.getWorktimesForWeek( week.weekNumber, month, self.hoursPerWeek);
                week.timeDelta = week.getMinutesWorked( filter ) - worktimes.minutesPerWeek;
            } );
        }
    };


module.exports = {
    createWeeklyOvertimeDecorator: function ( worktimeCalculator, hoursPerWeek, filter ) {
        return objectAssign( Object.create( WeeklyOvertimeDecorator ), {
            worktimeCalculator: worktimeCalculator,
            hoursPerWeek: hoursPerWeek,
            filter: filter || DayFilter.all()
        } );
    }
};