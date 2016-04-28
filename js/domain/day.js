var DayTypes = require( './day_types' ),
	objectAssign = require( 'object-assign' ),
	Day = {
		date: null,
		type: DayTypes.WORKDAY,
		minutesWorked: 0,
		addWorkMinutes: function ( minutes ) {
			this.minutesWorked += minutes;
			return this;
		}
	};

/**
 * @param {moment} date
 * @param {int} dayType
 * @return {Day}
 */
function createDay( date, dayType ) {
	return objectAssign( Object.create( Day ), {
		date: date,
		dayType: dayType
	} );
}

module.exports = {
	createDay: createDay,
	createWorkDay: function ( date ) {
		return createDay( date, DayTypes.WORKDAY );
	},
	createHolidayDay: function ( date ) {
		return createDay( date, DayTypes.HOLIDAY );
	}
};
