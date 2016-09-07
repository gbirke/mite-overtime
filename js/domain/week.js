const _ = require( 'lodash' ),
	Day = require( './day' );

export default class Week {
	constructor( moment ) {
		this.weekNumber = moment.week();
		this.days = {};
		this.moment = moment;
	}

	addDay( day ) {
		this.days[ day.getKey() ] = day;
	}

	getKey() {
		return this.moment.format( 'YYYY-ww' );
	}

	getMinutesWorked( dayFilter ) {
		const days = dayFilter ? dayFilter( days ) : this.days;
		return _.reduce( days, function ( minutesWorked, day ) {
			return minutesWorked + day.getMinutesWorked();
		}, 0 );

	}

	countDays( dayFilter ) {
		return _.keys( dayFilter( this.days ) ).length;
	}

	/**
	 * @deprecated
	 * @param workWeek
	 */
	addMissingDays ( workWeek ) {
		var date = this.moment.clone(),
			i, dayKey;
		for ( i = 0; i < 7; i++ ) {
			date.weekday( i );
			dayKey = date.format( 'YYYY-MM-DD' );
			if ( !_.has( this.days, dayKey ) ) {
				this.days[ dayKey ] = workWeek.isWorkDay( date ) ? Day.createWorkDay( date.clone() ) : Day.createHolyDay( date.clone() );
			}
		}
	}
}

export function createWeekFromMoment( moment ) {
	return new Week( moment );
}
