var objectAssign = require( 'object-assign' ),
	_ = require( 'lodash' ),
	Week = {
		weekNumber: 0,
		days: {},
		addDay: function ( day ) {
			this.days[ day.date ] = day;
		},
		getMinutesWorked: function () {
			return _.reduce( this.days, function ( minutesWorked, day ) {
				return minutesWorked + day.getMinutesWorked();
			}, 0 );
		}
	};

module.exports = {
	createWeek: function ( date ) {
		return objectAssign( Object.create( Week ), {
			weekNumber: date.week(),
			days: {}
		} );
	}
};
