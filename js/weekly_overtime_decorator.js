var objectAssign = require( 'object-assign' ),
    _ = require( 'lodash' ),
    DayFilter = require( './day_filter' ),
    WeeklyOvertimeDecorator = {
	workWeek: null,
	filter: null,
	cutoffDate: null,
	addOvertimeToWeeks: function ( weeks ) {
		var self = this;
		_.each( weeks, function ( week ) {
			self.addRequiredMinutes( week );
			week.timeDelta = week.getMinutesWorked() - week.requiredMinutes;
		} );
	},
	addRequiredMinutes: function ( week ) {
		var workdayFilter = this.getWorkdayFilter(),
			workdaysInWeek = week.countDays( workdayFilter );
		week.requiredMinutes = workdaysInWeek * this.workWeek.getHoursPerDay() * 60;
	},
	getWorkdayFilter: function () {
			// This function result could be cached for more performance
			var filters = [ DayFilter.workDays() ];
			if ( this.cutoffDate ) {
				filters.push( DayFilter.before( this.cutoffDate ) );
			}
			filters.push( this.filter );
			return DayFilter.combine.apply( DayFilter, filters );
		}
    };

module.exports = {
	createWeeklyOvertimeDecorator: function ( workWeek, filter, cutoffDate ) {
		return objectAssign( Object.create( WeeklyOvertimeDecorator ), {
			workWeek: workWeek,
			filter: filter || DayFilter.all(),
			cutoffDate: cutoffDate
		} );
	}
};
