
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
function getDateStringForEntry( entry ) {
	return entry.time_entry.date_at;
}

function getMinutesFromEntry( entry ) {
	if ( entry.time_entry.tracking ) {
		return entry.time_entry.tracking.minutes;
	} else {
		return entry.time_entry.minutes;
	}
}
// jscs:enable requireCamelCaseOrUpperCaseIdentifiers

export default class EntriesToDaysDecorator {
	addWorkingTimeToDays( days, entries ) {
		entries.forEach( ( entry ) => {
			var dateString = getDateStringForEntry( entry );
			if ( dateString in days ) {
				days[ dateString ].addWorkMinutes( getMinutesFromEntry( entry ) );
			}
		} );
		return days;
	}
}