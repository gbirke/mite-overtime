var _ = require( 'lodash'),
    Month = require( './domain/month' );

function addMonthIfNeeded( months, monthIndex, date ) {
    if ( !_.has( months, monthIndex ) ) {
        months[ monthIndex ] = Month.createMonth( date );
    }
}

module.exports = function buildMonthsFromWeeks( weeks ) {
    return _.reduce( weeks, function ( months, week ) {
        var weekDate = week.dateObject,
            firstDayMonthIndex = weekDate.clone().weekday(0).month(),
            lastDayMonthIndex =  weekDate.clone().weekday(6).month(),
            weekSpansAcrossMonths = ( firstDayMonthIndex !== lastDayMonthIndex ),
            firstWeekDate = weekSpansAcrossMonths ? weekDate.clone().weekday(0) : weekDate;

        addMonthIfNeeded( months, firstDayMonthIndex, firstWeekDate );
        months[ firstDayMonthIndex ].addWeek( week );
        if ( weekSpansAcrossMonths ) {
            addMonthIfNeeded( months, lastDayMonthIndex, weekDate.clone().weekday(6) );
            months[ lastDayMonthIndex ].addWeek( _.cloneDeep( week ) ); // Clone to allow decorators to decorate different objects
        }
        return months;
    }, {} );
};