var objectAssign = require( 'object-assign' ),
	_ = require( 'lodash'),
	Week = {
		weekNumber: 0,
		days: {},
		dateObject: null,
		addDay: function ( day ) {
			this.days[ day.dateObject.format( 'YYYY-MM-DD' ) ] = day;
		},
		getMinutesWorked: function ( dayFilter ) {
			var days = this.days;
			if ( dayFilter ) {
				days = dayFilter( days );
			}
			return _.reduce( days, function ( minutesWorked, day ) {
				return minutesWorked + day.getMinutesWorked();
			}, 0 );

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
