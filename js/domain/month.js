var objectAssign = require( 'object-assign' ),
	Month = {
		monthNumber: 0,
		weeks: {},
		minutesWorked: 0,
		addWeek: function ( week ) {
			this.weeks[ week.weekNumber ] = week;
			this.minutesWorked += week.minutesWorked;
		}
	};

module.exports = {
	createMonth: function ( date ) {
		return objectAssign( Object.create( Month ), {
			monthNumber: date.month()
		} );
	}
};
