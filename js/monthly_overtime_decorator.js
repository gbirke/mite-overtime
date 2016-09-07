var _ = require( 'lodash' ),
    MonthlyOvertimeDecorator = {
		addOvertimeToMonths: function (months ) {
			_.each( months, this.addOvertimeToMonth );
		},
		addOvertimeToMonth: function( month ) {
			month.timeDelta = _.reduce( month.weeks, function ( timeDelta, week ) {
				return timeDelta + week.timeDelta;
			}, 0 );
			month.requiredMinutes = _.reduce( month.weeks, function ( requiredMinutes, week ) {
				return requiredMinutes + week.requiredMinutes;
			}, 0 );
		}
    };

module.exports = {
	createMonthlyOvertimeDecorator: function () {
		return Object.create( MonthlyOvertimeDecorator );
	}
};
