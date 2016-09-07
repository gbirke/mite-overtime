import EntriesToDaysDecorator from './entries_to_days_decorator'

var objectAssign = require( 'object-assign' ),
    createWeeklyOvertimeDecorator = require( './weekly_overtime_decorator' ).createWeeklyOvertimeDecorator,
    createMonthlyOvertimeDecorator = require( './monthly_overtime_decorator' ).createMonthlyOvertimeDecorator,

    OvertimeFactory = {
		workWeek: null,
		cutoffDate:null,
		addTimeTrackingDataToMonth: function ( month, entries ) {
			const daysDecorator = new EntriesToDaysDecorator(),
				weeklyDecorator = createWeeklyOvertimeDecorator( this.workWeek, null, this.cutoffDate ),
				monthlyDecorator = createMonthlyOvertimeDecorator();
			daysDecorator.addWorkingTimeToDays( month.getDays(), entries );
			weeklyDecorator.addOvertimeToWeeks( month.weeks );
			monthlyDecorator.addOvertimeToMonth( month );
			return month;
		}
    }

    ;

module.exports = {
	createOvertimeFactory: function ( workWeek, locale, cutoffDate ) {
		return objectAssign( Object.create( OvertimeFactory ), {
			workWeek: workWeek,
			cutoffDate: cutoffDate
		} );
	}
};
