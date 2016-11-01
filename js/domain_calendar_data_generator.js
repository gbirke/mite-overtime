import Month from './domain/month'
import Week from './domain/week'
import Day from './domain/day'
import { HOLIDAY, WORKDAY } from './domain/day_types'

let moment = require( 'moment' );

function addDaysToWeek( week, getDayType, monthNumber ) {
	let currentDay = moment( week.start );
	while ( currentDay.isSameOrBefore( week.end ) ) {
		if ( currentDay.month() === monthNumber ) {
			let dd = currentDay.clone();
			week.addDay( new Day( dd, getDayType( dd ) ) );
		}
		currentDay.add( 1, 'day' );
	}
}

function addWeeksToMonth( month, startDate, getDayType ) {
	const endDate = moment( startDate ).add( 1, 'month' ).subtract( 1, 'day' );
	const currentWeek = startDate.clone();
	while ( currentWeek.clone().weekday( 0 ).isSameOrBefore( endDate ) ) {
		let week = new Week( currentWeek.clone() );
		addDaysToWeek( week, getDayType, month.monthNumber );
		month.addWeek( week );
		currentWeek.add( 1, 'week' );
	}
}

export default class CalendarDataGenerator {
	constructor( workweek, locale ) {
		this.workWeek = workweek;
		this.locale = locale;
	}

	getMonth( year, month ) {
		const monthObj = new Month( year, month );
		addWeeksToMonth(
			monthObj,
			moment( [ year, month ] ).locale( this.locale ),
			( date ) => ( this.workWeek.isWorkDay( date ) ? WORKDAY : HOLIDAY )
		);
		return monthObj;
	}
}
