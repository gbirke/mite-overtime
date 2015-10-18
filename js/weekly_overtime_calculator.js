var moment = require( 'moment' );

function numWorkingdaysForWeek( weekNumber, defaultWorkingdays ) {
	var firstDayOfWeek, lastWorkdayOfWeek;
	firstDayOfWeek = moment( weekNumber, 'w' );
	lastWorkdayOfWeek = moment( weekNumber, 'w' ).add( defaultWorkingdays, 'd' );
	if ( firstDayOfWeek.month() !== lastWorkdayOfWeek.month() ) {
		return lastWorkdayOfWeek.date();
	} else {
		return defaultWorkingdays;
	}
}

function workingdaysPerWeekIsValid( workingdaysPerWeek ) {
	return typeof workingdaysPerWeek === 'undefined' ||  ( workingdaysPerWeek >= 0 && workingdaysPerWeek <= 7 ) ;
}

function WeeklyOvertimeCalculator( workingdaysPerWeek, locale ) {
	if ( !workingdaysPerWeekIsValid( workingdaysPerWeek ) ) {
		throw 'Working days per week must be between 0 and 7.';
	}
	this.workingdaysPerWeek = workingdaysPerWeek || 5;
	this.locale = locale || 'en';
}

WeeklyOvertimeCalculator.prototype.getOvertime = function ( timeData, hoursPerWeek ) {
	var overtime = {
			total: 0,
			weeks: {},
			year: timeData.year,
			month: timeData.month
		},

		oldLocale = moment.locale(),
		workingdaysPerWeek,	minutesPerWeek, minutesPerDay, week, day, timeDifference;

	if ( oldLocale != this.locale ) {
		moment.locale( this.locale );
	}

	for ( week in timeData.weeks ) {
		workingdaysPerWeek = numWorkingdaysForWeek( week, this.workingdaysPerWeek );
		if ( workingdaysPerWeek != this.workingdaysPerWeek ) {
			minutesPerWeek =  ( ( hoursPerWeek / this.workingdaysPerWeek ) * workingdaysPerWeek ) * 60 ;
		} else {
			minutesPerWeek =  hoursPerWeek * 60;
		}
		minutesPerDay = minutesPerWeek / workingdaysPerWeek;
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
	moment.locale( oldLocale );
	return overtime;

};

module.exports = WeeklyOvertimeCalculator;
