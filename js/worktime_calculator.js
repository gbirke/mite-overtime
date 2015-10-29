var moment = require( 'moment' );

/**
 * @class WorktimeCalculator
 */
function WorktimeCalculator( workdays ) {
	var i;
	this.workdays = workdays;
	this.workdaysIndex = [];
	for ( i = 0; i < 7; i++ ) {
		this.workdaysIndex[ i ] = workdays.indexOf( i ) > -1;
	}
}

/**
 * Return the number of working days in a week
 * @param {number} week Week number
 * @param {number} month Month number (0-11)
 * @return {number} Number of workdays in the week
 */
WorktimeCalculator.prototype.getWorkdaysForWeek = function ( week, month ) {
	var firstDayOfWeek, nextWeek, dayPointer, 
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
 * @param {number} week Week number
 * @param {number} month Month number (0-11)
 * @param {number} hoursPerWeek The number of hours per week 
 * @return {Object} Calculated properties for the week: Number of workdays for the week, hours and minutes per day and week
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

/**
 * Check if a given day is a configured workday
 * @param {number} year 
 * @param {number} month Month number (0-11)
 * @param {number} day Day of the month (1-31)
 * @return {boolean}
 */
WorktimeCalculator.prototype.isAWorkday = function ( year, month, day ) {
	var dayOfWeek = moment( [ year, month, day ] ).day();
	return this.workdaysIndex[ dayOfWeek ];
}

/**
 * Return the working days of the week
 * @param {number} week Week number
 * @param {number} month Month number (0-11)
 * @return {number} Number of workdays in the week
 */
WorktimeCalculator.prototype.getWorkdatesForWeek = function ( week, month ) {
	var firstDayOfWeek, dayPointer, dayBelongsToWeek, i
		days = [];
	firstDayOfWeek = moment( week, 'w' );
	dayPointer = firstDayOfWeek;
	for ( i = 0; i < 7; i++ ) {
		if ( this.workdaysIndex[ dayPointer.day() ] && dayPointer.month() == month ) {
			days.push( dayPointer.date() );
		}
		dayPointer.add( 1, 'day' );
	}
	return days;
};

module.exports = WorktimeCalculator;
