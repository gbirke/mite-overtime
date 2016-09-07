import * as DayTypes from './day_types';

export default class Day {
	constructor( date, dayType ) {
		this.date = date.date();
		this.dateObject = date;
		this.type = dayType;
		this.minutesWorked = 0;
	}

	addWorkMinutes( minutes ) {
		this.minutesWorked += minutes;
		return this;
	}

	getMinutesWorked() {
		return this.minutesWorked;
	}

	isWorkDay() {
		return this.type === DayTypes.WORKDAY;
	}

	getKey() {
		return this.dateObject.format( 'YYYY-MM-DD' )
	}
}

/**
 * @param {moment} dateObject
 * @param {int} dayType
 * @return {Day}
 */
export function createDay( dateObject, dayType ) {
	return new Day( dateObject, dayType );
}



export function createWorkDay( dateObject ) {
	return new Day( dateObject, DayTypes.WORKDAY );
}

export function createHoliday(dateObject ) {
	return new Day( dateObject, DayTypes.HOLIDAY );
}

