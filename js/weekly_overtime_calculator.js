var moment = require( 'moment' );

function WeeklyOvertimeCalculator( workingdaysPerWeek ) {
	this.workingdaysPerWeek = workingdaysPerWeek || 5;
}

WeeklyOvertimeCalculator.prototype.getOvertime = function ( timeData, hoursPerWeek ) {
	var overtime = {
			total: 0,
			weeks: {},
			year: timeData.year,
			month: timeData.month
		},
		workingdaysPerWeek = 5,
		minutesPerWeek = hoursPerWeek * 60,
		minutesPerDay = minutesPerWeek / this.workingdaysPerWeek,
		week, day, timeDifference, daysWorked;
	for ( week in timeData.weeks ) {
		timeDifference = timeData.weeks[ week ].total - minutesPerWeek;
		overtime.total += timeDifference;
		overtime.weeks[ week ] = {
			days: {},
			total: timeDifference
		};
		for ( day in timeData.weeks[ week ].days ) {
			timeDifference = timeData.weeks[ week ].days[ day ].total - minutesPerDay;
			overtime.weeks[ week ].days[ day ] = {
				total: timeDifference
			};
		}
	}
	return overtime;

};

module.exports = WeeklyOvertimeCalculator;
