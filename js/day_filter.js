var _ = require( 'lodash' );

module.exports = {
    all: function () {
        return function ( days ) {
            return days;
        };
    },

    byMonth: function ( month ) {
        return function ( days ) {
            return _.pickBy( days, function ( day ) {
                return day.dateObject.month() == month;
            } );
        };
    },

    before: function ( date ) {
        return function ( days ) {
            return _.pickBy( days, function ( day ) {
                return day.dateObject.isBefore( date );
            } );
        };
    },

    workDays: function () {
        return function ( days ) {
            return _.pickBy( days, function ( day ) {
                return day.isWorkDay();
            } );
        };
    },

    combine: function () {
        var args = arguments;
        return function ( days ) {
            return _.reduce( args, function( remainingDays, filterFunction ) {
                return filterFunction( remainingDays );
            }, days );
        };
    }

};