const _ = require( 'lodash' );

export default class Month {
	constructor( year, month ) {
		this.monthNumber = month;
		this.year = year;
		this.weeks = {};
	}

	addWeek ( week ) {
		this.weeks[ week.getKey() ] = week;
	}

	getMinutesWorked () {
		return _.reduce( this.weeks, function ( minutesWorked, week ) {
			return minutesWorked + week.getMinutesWorked();
		}, 0 );
	}
}

export function createMonthFromMoment( date ) {
	return new Month( date.year(), date.month() );
}
