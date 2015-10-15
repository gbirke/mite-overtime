var moment = require('moment'),
	TotalsObjectAggregator = require('./totals_object_aggregator'),
	weekDefault = new TotalsObjectAggregator( { days: {} } ),
	dayDefault = new TotalsObjectAggregator( {} );

function TimeAggregator( rawEntries, locale ) {
	this._entries = rawEntries;
	this.locale = typeof locale !== "undefined" ? locale : 'en';
	this._aggregatedData = null;
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
		data.weeks[week] = weekDefault.getData( data.weeks, week, entry.minutes );
		data.weeks[week].days[dayOfMonth] = dayDefault.getData( data.weeks[week].days, dayOfMonth, entry.minutes );
	}
	return data;
}

TimeAggregator.prototype.getAggregatedData = function() {
	if ( !this._aggregatedData ) {
		this._aggregatedData = calculateAggregatedData( this._entries, this.locale );
	}
	return this._aggregatedData;
};

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
};

module.exports = TimeAggregator;
