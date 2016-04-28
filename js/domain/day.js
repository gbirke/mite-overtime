var DayTypes = require( './day_types' ),
	objectAssign = require( 'object-assign' ),
	Day = {
		date: 0,
		dateObject: 0,
		type: DayTypes.WORKDAY,
		minutesWorked: 0,
		addWorkMinutes: function ( minutes ) {
			this.minutesWorked += minutes;
			return this;
		},
		getMinutesWorked: function () {
			return this.minutesWorked;
		}
	};

/**
 * @param {moment} dateObject
 * @param {int} dayType
 * @return {Day}
 */
function createDay( dateObject, dayType ) {
	return objectAssign( Object.create( Day ), {
		date: dateObject.date(),
		dateObject: dateObject,
		dayType: dayType
	} );
}

module.exports = {
	createDay: createDay,
	createWorkDay: function ( dateObject ) {
		return createDay( dateObject, DayTypes.WORKDAY );
	},
	createHolidayDay: function ( dateObject ) {
		return createDay( dateObject, DayTypes.HOLIDAY );
	}
};
