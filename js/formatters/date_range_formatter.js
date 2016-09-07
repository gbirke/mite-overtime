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
			// only last day of week is in current month, format as date
			if ( week.end.date() == 1 ) {
				datePieces = [ week.end.format( 'DD.MM.' ) ]
			} else { // more than 1 day in current month
				datePieces.push(  '01.' );
				datePieces.push(  week.end.format( 'DD.MM.' ) );
			}
		} else { // week is at the end of month
			// only 1st day of week is in current month, format as date
			if ( week.start.clone().add( 1, 'day' ).month() !== this.currentMonth ) {
				datePieces = [ week.start.format( 'DD.MM.' ) ]
			} else { // more than 1 day in current month
				datePieces.push( week.start.format( 'DD.' ) );
				// Explanation of the following code line:
				// Date 0 is "invalid" because dates (days of months) start with 0,
				// date(0) will create the last day of the previous month
				datePieces.push(  week.end.date( 0 ).format( 'DD.MM.' ) );
			}
		}
		return datePieces.join( ' - '  );
	}
}