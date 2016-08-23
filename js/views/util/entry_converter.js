let createWorkWeek = require( '../../domain/workweek' ).createWorkWeek;
let moment = require( 'moment' );
let CalendarDataGenerator = require( '../../calendar_data_generator' );

export default class EntryConverter {
	constructor( overtimeFactoryConstructor ) {
		this.overtimeFactoryConstructor = overtimeFactoryConstructor;
	}

	getDataForRenderer( entries, currentDateStr, workingDays, hoursPerWeek, holidayFunction, locale ) {
		const workWeek = createWorkWeek( workingDays, hoursPerWeek, holidayFunction );
		const overtimeFactory = this.overtimeFactoryConstructor( workWeek, locale );
		const calendarDataGenerator = new CalendarDataGenerator( workWeek, locale );
		const currentDate = currentDateStr ? moment( currentDateStr ) : moment();
		const overtimeData = overtimeFactory.getMonthsFromEntries( entries );
		return [
			calendarDataGenerator.generateData( currentDate.year(), currentDate.month() ),
			overtimeData[ currentDate.month() ] || {}
		];
	}
}