var objectAssign = require( 'object-assign' ),
	_ = require( 'lodash' ),
	Month = {
		monthNumber: 0,
		weeks: {},
		addWeek: function ( week ) {
			this.weeks[ week.weekNumber ] = week;
		},
		getMinutesWorked:  function () {
			return _.reduce( this.weeks, function ( minutesWorked, week ) {
				return minutesWorked + week.getMinutesWorked();
			}, 0 );
		}
	};

module.exports = {
	createMonth: function ( date ) {
		return objectAssign( Object.create( Month ), {
			monthNumber: date.month(),
			weeks: {}
		} );
	}
};
