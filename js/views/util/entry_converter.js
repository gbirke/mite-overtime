let createWorkWeek = require( '../../domain/workweek' ).createWorkWeek;
let moment = require( 'moment' );
let CalendarDataGenerator = require( '../../domain_calendar_data_generator' );

export default class EntryConverter {
	constructor( overtimeFactoryConstructor ) {
		this.overtimeFactoryConstructor = overtimeFactoryConstructor;
	}

	getDataForRenderer( entries, currentDateStr, workingDays, hoursPerWeek, holidayFunction, locale ) {
		const currentDate = currentDateStr ? moment( currentDateStr ) : moment();
		const workWeek = createWorkWeek( workingDays, hoursPerWeek, holidayFunction );
		const overtimeFactory = this.overtimeFactoryConstructor( workWeek, locale, currentDate );
		const calendarDataGenerator = new CalendarDataGenerator( workWeek, locale );
		const month = calendarDataGenerator.generateData( currentDate.year(), currentDate.month() );
		return overtimeFactory.addTimeTrackingDataToMonth( month, entries );
	}
}