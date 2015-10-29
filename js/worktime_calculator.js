var moment = require( 'moment' );

function WorktimeCalculator( workdays ) {
	var i;
	this.workdays = workdays;
	this.workdaysIndex = [];
	for ( i = 0; i < 7; i++ ) {
		this.workdaysIndex[ i ] = workdays.indexOf( i ) > -1;
	}
}

WorktimeCalculator.prototype.getWorkdaysForWeek = function ( week, month ) {
	var firstDayOfWeek, nextWeek, dayPointer, dayBelongsToWeek,
		dayCount = 0;
	firstDayOfWeek = moment( week, 'w' );
	nextWeek = moment( week, 'w' ).add( 7, 'days' );
	if ( firstDayOfWeek.month() === nextWeek.month() ) {
		return this.workdays.length;
	}
	dayPointer = firstDayOfWeek;
	while ( dayPointer.diff( nextWeek, 'days' ) < 0 ) {
		if ( this.workdaysIndex[ dayPointer.day() ] && dayPointer.month() == month ) {
			dayCount += 1;
		}
		dayPointer.add( 1, 'day' );
	}
	return dayCount;
};

/**
 * Get the required work times for the week
 *
 * If the week consists of days that are not workdays, the required working times are 0.
 */
WorktimeCalculator.prototype.getWorktimesForWeek = function ( week, month, hoursPerWeek ) {
	var workdaysForWeek = this.getWorkdaysForWeek( week, month ),
		hoursPerDay = hoursPerWeek / this.workdays.length;
	return {
		workdays: this.workdays.length,
		workdaysForWeek: workdaysForWeek,
		hoursPerDay: workdaysForWeek ? hoursPerDay : 0,
		hoursPerWeek: workdaysForWeek * hoursPerDay,
		minutesPerDay: workdaysForWeek ? hoursPerDay * 60 : 0,
		minutesPerWeek: workdaysForWeek * hoursPerDay * 60
	};
};

WorktimeCalculator.prototype.isAWorkday = function ( year, month, day ) {
	var dayOfWeek = moment( [ year, month, day ] ).day();
	return this.workdaysIndex[ dayOfWeek ];
}

module.exports = WorktimeCalculator;
