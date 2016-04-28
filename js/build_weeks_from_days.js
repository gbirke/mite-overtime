var _ = require( 'lodash'),
    Week = require( './domain/week' );


module.exports = function buildWeeksFromDays( days ) {
    return _.reduce( days, function ( weeks, day ) {
        var weekIndex = day.dateObject.week();
        if ( !_.has( weeks, weekIndex ) ) {
            weeks[ weekIndex ] = Week.createWeek( day.dateObject );
        }
        weeks[ weekIndex ].addDay( day );
        return weeks;
    }, {} );
};