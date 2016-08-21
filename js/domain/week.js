var objectAssign = require( 'object-assign' ),
	_ = require( 'lodash' ),
	Day = require( './day' ),
	getDayKey = function ( date ) {
		return date.format( 'YYYY-MM-DD' );
	},
	Week = {
		weekNumber: 0,
		days: {},
		dateObject: null,
		addDay: function ( day ) {
			this.days[ getDayKey( day.dateObject ) ] = day;
		},
		getMinutesWorked: function ( dayFilter ) {
			var days = this.days;
			if ( dayFilter ) {
				days = dayFilter( days );
			}
			return _.reduce( days, function ( minutesWorked, day ) {
				return minutesWorked + day.getMinutesWorked();
			}, 0 );

		},
		countDays: function ( dayFilter ) {
			return _.keys( dayFilter( this.days ) ).length;
		},
		addMissingDays: function ( workWeek ) {
			var date = this.dateObject.clone(),
					i, dayKey;
			for ( i = 0; i < 7; i++ ) {
				date.weekday( i );
				dayKey = getDayKey( date );
				if ( !_.has( this.days, dayKey ) ) {
					this.days[ dayKey ] = workWeek.isWorkDay( date ) ? Day.createWorkDay( date.clone() ) : Day.createHolyDay( date.clone() );
				}
			}
		}
	};

module.exports = {
	createWeek: function ( date ) {
		return objectAssign( Object.create( Week ), {
			weekNumber: date.week(),
			days: {},
			dateObject: date
		} );
	}
};
