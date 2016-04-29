var objectAssign = require( 'object-assign' ),
	_ = require( 'lodash'),
	WorkWeek = {
		workingDays: [],
		holidayFunction: null,
		hoursPerWeek: 0,
		isAWorkDay: function ( date ) {
			return this.workingDays.indexOf( date.day() ) > -1 && !this.holidayFunction( date );
		},
		getDaysPerWeek: function () {
			return this.workingDays.length;
		},
		getHoursPerDay: function () {
			if ( this.workingDays.length === 0 ) {
				return 0;
			}
			return this.hoursPerWeek / this.workingDays.length;
		}
	};

module.exports = {
	createWorkWeek: function ( workingDays, hoursPerWeek, holidayFunction ) {
		return objectAssign( Object.create( WorkWeek ), {
			workingDays: workingDays,
			hoursPerWeek: hoursPerWeek,
			holidayFunction: holidayFunction ? holidayFunction : function () { return false; }
		} );
	}
};