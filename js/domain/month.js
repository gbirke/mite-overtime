const _ = require( 'lodash' );

export default class Month {
	constructor( year, month ) {
		this.monthNumber = month;
		this.year = year;
		this.weeks = {};
		this.requiredMinutes = 0;
		this.timeDelta = 0;
	}

	addWeek ( week ) {
		this.weeks[ week.getKey() ] = week;
	}

	getMinutesWorked () {
		return _.reduce( this.weeks, function ( minutesWorked, week ) {
			return minutesWorked + week.getMinutesWorked();
		}, 0 );
	}

	getDays () {
		return _.reduce( this.weeks, function ( days, week ) {
			return Object.assign( days, week.days );
		}, {} );
	}
}

export function createMonthFromMoment( date ) {
	return new Month( date.year(), date.month() );
}
