var _ = require( 'lodash'),
    MonthlyOvertimeDecorator = {
        addOvertimeToEntries: function ( months ) {
            _.each( months, function ( month ) {
                month.timeDelta = _.reduce( month.weeks, function ( timeDelta, week ) {
                    return timeDelta + week.timeDelta;
                }, 0 );
            } );
        }
    };

module.exports = {
    createMonthlyOvertimeDecorator: function () {
        return Object.create( MonthlyOvertimeDecorator );
    }
}
