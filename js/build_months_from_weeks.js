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
            lastDayMonthIndex =  weekDate.clone().weekday(6).month();
        addMonthIfNeeded( months, firstDayMonthIndex, weekDate );
        months[ firstDayMonthIndex ].addWeek( week );
        if ( firstDayMonthIndex !== lastDayMonthIndex ) {
            addMonthIfNeeded( months, lastDayMonthIndex, weekDate );
            months[ lastDayMonthIndex ].addWeek( week );
        }
        return months;
    }, {} );
};