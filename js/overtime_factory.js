var objectAssign = require( 'object-assign' ),
    _ = require( 'lodash'),
    createEntriesToDaysConverter = require( './entries_to_days_converter' ).createEntriesToDaysConverter,
    buildWeeksFromDays = require( './build_weeks_from_days' ),
    buildMonthsFromWeeks = require( './build_months_from_weeks' ),
    createWeeklyOvertimeDecorator = require( './weekly_overtime_decorator').createWeeklyOvertimeDecorator,
    createMonthlyOvertimeDecorator = require( './monthly_overtime_decorator').createMonthlyOvertimeDecorator,
    DayFilter = require( './day_filter' )
    ;

    OvertimeFactory = {
        workWeek: null,
        getDaysFromEntries: null,
		/**
         * Return overtime entries for each month.
         *
         * Weekly overtime is counted month-wise
         *
         * @param {Array} entries Mite entries
         * @returns {Object}
         */
        getMonthsFromEntries: function ( entries ) {
            var days = this.getDaysFromEntries( entries),
                weeks = buildWeeksFromDays( days ),
                months = buildMonthsFromWeeks( weeks ),
                workWeek = this.workWeek,
                monthlyOvertimeDecorator = createMonthlyOvertimeDecorator()
            ;

			// Decorate weeks
            _.each( months, function( month, monthNumber ) {
                var filter = DayFilter.byMonth( monthNumber ),
                    overTimeDecorator = createWeeklyOvertimeDecorator( workWeek, filter );
                _.each( month.weeks, function ( week ) {
                    week.addMissingDays( workWeek );
                } );
                overTimeDecorator.addOvertimeToEntries( month.weeks )
            } );

			// decorate months
			monthlyOvertimeDecorator.addOvertimeToEntries( months );

            return months;
        }
    }

    ;


module.exports = {
    createOvertimeFactory: function ( workWeek, locale ) {
        var entriesFromDaysConverter = createEntriesToDaysConverter( workWeek, locale );
        return objectAssign( Object.create( OvertimeFactory ), {
            getDaysFromEntries: _.bind( entriesFromDaysConverter.getDaysFromEntries, entriesFromDaysConverter),
            workWeek: workWeek
        } );
    }
};