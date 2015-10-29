var moment = require( 'moment' );

function WeeklyOvertimeCalculator( worktimeCalculator ) {
	this.worktimeCalculator = worktimeCalculator;
}

WeeklyOvertimeCalculator.prototype.getOvertime = function ( timeData, hoursPerWeek ) {
	var overtime = {
			total: 0,
			weeks: {},
			year: timeData.year,
			month: timeData.month
		},
		worktimes, week, day, timeDifference;

	for ( week in timeData.weeks ) {
		worktimes = this.worktimeCalculator.getWorktimesForWeek( week, timeData.month, hoursPerWeek );
		timeDifference = timeData.weeks[ week ].total - worktimes.minutesPerWeek;
		overtime.total += timeDifference;
		overtime.weeks[ week ] = {
			days: {},
			total: timeDifference
		};
		for ( day in timeData.weeks[ week ].days ) {
			if ( this.worktimeCalculator.isAWorkday( timeData.year, timeData.month, day ) ) {
				timeDifference = timeData.weeks[ week ].days[ day ].total - worktimes.minutesPerDay;
			}
			else {
				timeDifference = timeData.weeks[ week ].days[ day ].total;
			}
			overtime.weeks[ week ].days[ day ] = {
				total: timeDifference
			};
		}
	}
	return overtime;

};

module.exports = WeeklyOvertimeCalculator;
