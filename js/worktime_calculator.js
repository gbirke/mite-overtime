var moment = require( 'moment' );

/**
 * @class WorktimeCalculator
 */
function WorktimeCalculator( workdays, holidayCallback ) {
	var i;
	this.workdays = workdays;
	this.workdaysIndex = [];
	this.holidayCallback = holidayCallback || function () { return false; };
	for ( i = 0; i < 7; i++ ) {
		this.workdaysIndex[ i ] = workdays.indexOf( i ) > -1;
	}
}

/**
 * Return the working days of the week for a given month.
 *
 * @param {number} week Week number
 * @param {number} month Month number (0-11)
 * @return {Array} An array with the workdays in the week
 */
WorktimeCalculator.prototype.getWorkdaysForWeek = function ( week, month ) {
	var firstDayOfWeek, dayPointer, dayBelongsToWeek, i, isAWorkday,
		days = [];
	firstDayOfWeek = moment( week, 'w' );
	dayPointer = firstDayOfWeek;
	for ( i = 0; i < 7; i++ ) {
		isAWorkday = this.isAWorkday( dayPointer.year(), dayPointer.month(), dayPointer.date() );
		if ( isAWorkday && dayPointer.month() == month ) {
			days.push( dayPointer.date() );
		}
		dayPointer.add( 1, 'day' );
	}
	return days;
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
	var workdatesForWeek = this.getWorkdaysForWeek( week, month ),
		workdaysForWeek = workdatesForWeek.length,
		hoursPerDay = hoursPerWeek / this.workdays.length;
	return {
		workdates: workdatesForWeek,
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
	var date = moment( [ year, month, day ] );
	return this.workdaysIndex[ date.day() ] && !this.holidayCallback( date );
}

module.exports = WorktimeCalculator;
