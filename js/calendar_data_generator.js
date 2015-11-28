var moment = require( 'moment' ),
	DayTypes = require( './day_types' );

function CalendarDataGenerator( worktimeCalculator ) {
	this.worktimeCalculator = worktimeCalculator;
}

CalendarDataGenerator.prototype.generateData = function ( year, month ) {
	var data = {
		year: year,
		month: month,
		weeks: {}
	},
	day = moment( [ year, month, 1 ] ),
	week, date, dayType;
	while ( day.month() == month ) {
		week = day.week();
		date = day.date();
		if ( !data.weeks[ week ] ) {
			data.weeks[ week ] = {
				week: week,
				days: {}
			};
		}
		if ( !data.weeks[ week ].days[ date ] ) {
			dayType = this.worktimeCalculator.isAWorkday( day ) ? DayTypes.WORKDAY : DayTypes.HOLIDAY;
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
