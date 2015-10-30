var moment = require( 'moment' );

function CalendarDataGenerator() {

}

CalendarDataGenerator.prototype.generateData = function ( year, month ) {
	var data = {
		year: year,
		month: month,
		weeks: {}
	},
	day = moment( [ year, month, 1 ] ),
	week, date;
	while ( day.month() == month ) {
		week = day.week();
		date = day.date();
		if ( ! data.weeks[ week ] ) {
			data.weeks[ week ] = {
				week: week,
				days: {}
			};
		}
		if ( ! data.weeks[ week ].days[ date ] ) {
			data.weeks[ week ].days[ date ] = {
				date: day
			};
		}
		day.add( 1, 'day' );
	}

	return data;
};

module.exports = CalendarDataGenerator;