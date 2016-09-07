import Month from './domain/month'
import Week from './domain/week'
import Day from './domain/day'
import { HOLIDAY, WORKDAY } from './domain/day_types'

let moment = require( 'moment' ),
	_ = require( 'lodash' );

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
	const endWeek = moment( startDate ).add( 1, 'month' ).subtract( 1, 'day' ).week();
	const startWeek = startDate.week();
	for( let i=startWeek; i <= endWeek; i++ ) {
		let weekDate = moment( startDate ).week( i );
		let week = new Week( weekDate );
		addDaysToWeek( week, getDayType, month.monthNumber );
		month.addWeek( week );
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
