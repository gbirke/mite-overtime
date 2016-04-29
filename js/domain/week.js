var objectAssign = require( 'object-assign' ),
	_ = require( 'lodash' ),
	calculateMinutesWorkedFromDays = function ( days ) {
		return _.reduce( days, function ( minutesWorked, day ) {
			return minutesWorked + day.getMinutesWorked();
		}, 0 );
	},
	Week = {
		weekNumber: 0,
		days: {},
		dateObject: null,
		addDay: function ( day ) {
			this.days[ day.date ] = day;
		},
		getMinutesWorked: function () {
			return calculateMinutesWorkedFromDays( this.days )
		},
		getMinutesWorkedInMonth: function ( month ) {
			return calculateMinutesWorkedFromDays(
					_.pickBy( this.days, function ( day ) {
						return day.dateObject.month() == month;
					} )
			);
		}
	};

module.exports = {
	createWeek: function ( date ) {
		return objectAssign( Object.create( Week ), {
			weekNumber: date.week(),
			days: {},
			dateObject: date
		} );
	}
};
