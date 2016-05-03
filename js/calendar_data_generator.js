/**
 * @module calendar_data_generator
 * @requires day_types
 */

/**
 * @external moment
 * @see {@link http://momentjs.com/}
 */

var moment = require( 'moment' ),
	DayTypes = require( './domain/day_types' );

/**
 * @typedef {Object} CalendarDataDay
 * @property {moment} date - date object
 * @property {day_types.WORKDAY|day_types.HOLIDAY} dayType - Type of day
 */

/**
 * @typedef {Object} CalendarDataWeek
 * @property {number} week - week number between 0 and 52
 * @property {Object.<number, CalendarDataDay>} days
 * @property {moment} start
 */

/**
 * @typedef {Object} CalendarData
 * @property {number} year - 4-digit year
 * @property {number} month - Month number from 0 to 11
 * @property {CalendarDataWeek[]} weeks
 */

/**
 * Create a calendar object
 *
 * @class
 * @param {WorkWeek} workWeek
 * @param {string} locale
 */
function CalendarDataGenerator( workWeek, locale ) {
	this.workWeek = workWeek;
	this.locale = locale;
}

/**
 * @return {CalendarData}
 */
CalendarDataGenerator.prototype.generateData = function ( year, month ) {
	var data = {
		year: year,
		month: month,
		weeks: {}
	},
	day, week, date, dayType;
	moment.locale( this.locale );
	day = moment( [ year, month, 1 ] );
	while ( day.month() == month ) {
		week = day.week();
		date = day.date();
		if ( !data.weeks[ week ] ) {
			data.weeks[ week ] = {
				week: week,
				days: {},
				// TODO make it configurable if week starts/ends at month boundaries (for month view) or weekday boundaries (for 4-week view)
				start: day.clone().weekday( 0 ),
				end: day.clone().weekday( 6 )
			};
		}
		if ( !data.weeks[ week ].days[ date ] ) {
			dayType = this.workWeek.isWorkDay( day ) ? DayTypes.WORKDAY : DayTypes.HOLIDAY;
			data.weeks[ week ].days[ date ] = {
				date: day.clone(),
				dayType: dayType
			};
		}
		day.add( 1, 'day' );
	}

	return data;
};

module.exports = CalendarDataGenerator;
