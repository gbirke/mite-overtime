export function getHolidayFunction( locale, holidayQualifier ) {
	switch ( locale ) {
		case 'de':
		case 'de_DE':
			const holiday = require( 'holiday-de' );
			holiday.setState( holidayQualifier );
			return function( date ) {
				return !holiday.isWorkday( date );
			};
		default:
			return function () {
				return false;
			};
	}
}