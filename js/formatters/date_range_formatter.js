export default class DateRangeFormatter {
	constructor( currentMonth ) {
		this.currentMonth = currentMonth;
	}

	formatWeek( week ) {

		function weekIsAtBeginningOfMonth( currentMonth ) {
			return week.start.month() < currentMonth ||
				( week.start.year() < week.end.year() && week.end.month() == currentMonth );
		}

		var datePieces = [];
		if ( week.start.month() === week.end.month() ) {
			datePieces.push(  week.start.format( 'DD.' ) );
			datePieces.push(  week.end.format( 'DD.MM.' ) );
		} else if ( weekIsAtBeginningOfMonth( this.currentMonth ) ) {
			datePieces.push(  '01.' );
			datePieces.push(  week.end.format( 'DD.MM.' ) );
		} else {
			datePieces.push(  week.start.format( 'DD.' ) );
			datePieces.push(  week.end.date( 0 ).format( 'DD.MM.' ) ); // Date 0 is "invalid" because dates (days of months) start with 0, so this will create the last day of the previous month
		}
		return datePieces.join( ' - '  );
	}
}