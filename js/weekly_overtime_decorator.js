var objectAssign = require( 'object-assign' ),
    _ = require( 'lodash'),
    DayFilter = require( './day_filter' ),
    WeeklyOvertimeDecorator = {
        workWeek: null,
        filter: null,
        addOvertimeToEntries: function ( weeks ) {
            var self = this;
            _.each( weeks, function ( week ) {
                self.addRequiredMinutes( week );
                week.timeDelta = week.getMinutesWorked( self.filter ) - week.requiredMinutes;
            } );
        },
        addRequiredMinutes: function ( week ) {
            var workdayFilter = DayFilter.combine( this.filter, DayFilter.workDays() ),
                workdaysInWeek = week.countDays( workdayFilter );
            week.requiredMinutes = workdaysInWeek * this.workWeek.getHoursPerDay() * 60
        }
    };


module.exports = {
    createWeeklyOvertimeDecorator: function ( workWeek, filter ) {
        return objectAssign( Object.create( WeeklyOvertimeDecorator ), {
            workWeek: workWeek,
            filter: filter || DayFilter.all()
        } );
    }
};