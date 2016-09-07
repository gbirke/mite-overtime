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
		},
		isWorkDay: function () {
			return this.type === DayTypes.WORKDAY;
		},
		getKey: function() {
			return this.dateObject.format( 'YYYY-MM-DD' )
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
		type: dayType
	} );
}

module.exports = {
	createDay: createDay,
	createWorkDay: function ( dateObject ) {
		return createDay( dateObject, DayTypes.WORKDAY );
	},
	createHolyDay: function ( dateObject ) {
		return createDay( dateObject, DayTypes.HOLIDAY );
	}
};
