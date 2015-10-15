var moment = require('moment');

function TimeAggregator( rawEntries, locale ) {
	this._entries = rawEntries;
	this.locale = typeof locale !== "undefined" ? locale : 'en';
	this._aggregatedData = null;
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

function calculateAggregatedData( entries, locale ) {
	var data = {
		total: 0,
		weeks: {}
	},
	entryCount = entries.length,
	i, entry, day, firstDate, week, dayOfMonth;
	if ( !entryCount ) {
		return data;
	}
	firstDate = moment( entries[0].time_entry.date_at );
	firstDate.locale( locale );
	for ( i=0; i < entryCount; i++ ) {
		entry = entries[i].time_entry;
		day = moment( entry.date_at );
		day.locale( locale );
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

TimeAggregator.prototype.getAggregatedData = function() {
	if ( !this._aggregatedData ) {
		this._aggregatedData = calculateAggregatedData( this._entries, this.locale );
	}
	return this._aggregatedData;
}

TimeAggregator.prototype.getDays = function() {
	var days = {}, day, week;
	if ( !this._aggregatedData ) {
		this._aggregatedData = calculateAggregatedData( this._entries, this.locale );
	}
	for( week in this._aggregatedData.weeks ) {
		for( day in this._aggregatedData.weeks[week].days ) {
			days[day] = this._aggregatedData.weeks[week].days[day];
		}
	}
	return days;
}

module.exports = TimeAggregator
