const _ = require( 'lodash' ),
	Day = require( './day' );

export default class Week {
	constructor( moment ) {
		this.moment = moment;
		this.weekNumber = moment.week();
		this.start = moment.clone().weekday( 0 );
		this.end = moment.clone().weekday( 6 );
		this.days = {};
		this.requiredMinutes = 0;
		this.timeDelta = 0;
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
}

export function createWeekFromMoment( moment ) {
	return new Week( moment );
}
