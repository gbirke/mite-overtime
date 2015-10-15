var moment = require('moment');

function TimeAggregator( rawEntries, locale ) {
	this._entries = rawEntries;
	this.locale = typeof locale !== "undefined" ? locale : 'en';
}

TimeAggregator.prototype.getAggregatedData = function() {
	var data = {
		total: 0,
		weeks: {}
	},
	entryCount = this._entries.length,
	i, entry, day, firstDate, week, dayOfMonth;
	if ( !entryCount ) {
		return data;
	}
	firstDate = moment( this._entries[0].time_entry.date_at );
	firstDate.locale( this.locale );
	for ( i=0; i < entryCount; i++ ) {
		entry = this._entries[i].time_entry;
		day = moment( entry.date_at );
		day.locale( this.locale );
		if ( day.month() != firstDate.month() ) {
			continue;
		}
		week = day.week();
		dayOfMonth = day.date();
		data.total += entry.minutes;
		if ( !data.weeks.hasOwnProperty( week ) ) {
			data.weeks[week] = {
				total: entry.minutes,
				days: {}
			};
		} else {
			data.weeks[week].total += entry.minutes;
		}
		if ( !data.weeks[week].days.hasOwnProperty( dayOfMonth ) ) {
			data.weeks[week].days[dayOfMonth] = {
				total: entry.minutes
			};
		} else {
			data.weeks[week].days[dayOfMonth].total += entry.minutes;
		}
	}
	return data;
}

module.exports = TimeAggregator
