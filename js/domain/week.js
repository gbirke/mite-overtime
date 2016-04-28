var objectAssign = require( 'object-assign' ),
	Week = {
		weekNumber: 0,
		days: {},
		minutesWorked: 0,
		addDay: function ( day ) {
			this.days[ day.date ] = day;
			this.minutesWorked += day.minutesWorked;
		}
	};

module.exports = {
	createWeek: function ( date ) {
		return objectAssign( Object.create( Week ), {
			weekNumber: date.week()
		} );
	}
};
