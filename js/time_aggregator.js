var moment = require('moment');

function TimeAggregator( rawEntries, locale ) {
	this._entries = rawEntries;
	this.locale = typeof locale !== "undefined" ? locale : 'en';
}

function addToWeekData( weeks, week, minutes ) {
	var weekData;
	if ( !weeks.hasOwnProperty( week ) ) {
		weekData = {
			total: minutes,
			days: {}
		};
	} else {
		weekData = weeks[week];
		weekData.total += minutes;
	}
	return weekData;
}

function addToDayData( days, dayOfMonth, minutes ) {
	var dayData;
	if ( !days.hasOwnProperty( dayOfMonth ) ) {
		dayData = {
			total: minutes
		};
	} else {
		dayData = days[dayOfMonth];
		dayData.total += minutes;
	}
	return dayData;
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
		data.total += entry.minutes;
		week = day.week();
		dayOfMonth = day.date();
		data.weeks[week] = addToWeekData( data.weeks, week, entry.minutes );
		data.weeks[week].days[dayOfMonth] = addToDayData( data.weeks[week].days, dayOfMonth, entry.minutes );
	}
	return data;
}

module.exports = TimeAggregator
