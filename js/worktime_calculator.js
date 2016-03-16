var moment = require( 'moment' );

/**
 * Calulate daily and hourly worktimes based on configured work days and holidays
 *
 * @class WorktimeCalculator
 * @param {Array} workdays Day numbers (0-6) that are counted as work days
 * @param {Function=} holidayCallback Callback function that checks if a given date is a holiday
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
 * Return the calendar dates of a week number for a given month.
 *
 * @param {number} week Week number
 * @param {number} month Month number (0-11)
 * @return {moment[]} 
 */
WorktimeCalculator.prototype.getDaysForWeek = function ( week, month ) {
	var firstDayOfWeek, dayPointer, i,
		days = [];
	firstDayOfWeek = moment( week, 'w' );
	dayPointer = firstDayOfWeek;
	for ( i = 0; i < 7; i++ ) {
		if ( dayPointer.month() == month ) {
			days.push( moment( dayPointer ) );
		}
		dayPointer.add( 1, 'day' );
	}
	return days;
};

/**
 * Return the working days of the week for a given month.
 *
 * @param {number} week Week number
 * @param {number} month Month number (0-11)
 * @return {Array} An array with the workdays in the week
 */
WorktimeCalculator.prototype.getWorkdaysForWeek = function ( week, month ) {
	var daysOfWeek = this.getDaysForWeek( week, month ),
		days = [],
		i;
	for ( i = 0; i < daysOfWeek.length; i++ ) {
		if ( this.isAWorkday( daysOfWeek[ i ] ) ) {
			days.push( daysOfWeek[ i ].date() );
		}
	}
	return days;
};

/**
 * Get the required work times for the week
 *
 * If the week consists of days that are not workdays, the required working times are 0.
 *
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
 * Check if a given date is a configured workday
 *
 * The date can either be given
 *
 * @param {moment} date
 * @return {boolean}
 */
WorktimeCalculator.prototype.isAWorkday = function ( date ) {
	return this.workdaysIndex[ date.day() ] && !this.holidayCallback( date );
};

module.exports = WorktimeCalculator;
