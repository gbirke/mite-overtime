var moment = require( 'moment' ),
	TotalsObjectAggregator = require( './totals_object_aggregator' ),
	weekDefault = new TotalsObjectAggregator( { days: {} } ),
	dayDefault = new TotalsObjectAggregator( {} );

function TimeAggregator( rawEntries, locale ) {
	this.entries = rawEntries;
	this.locale = typeof locale !== 'undefined' ? locale : 'en';
	this.aggregatedData = null;
}

function getEntryMinutes( entry ) {
	if ( entry.tracking ) {
		return entry.tracking.minutes;
	} else {
		return entry.minutes;
	}
}

function calculateAggregatedData( entries, locale ) {
	var data = {
		total: 0,
		weeks: {}
	},
	entryCount = entries.length,
	i, entry, day, firstDate, week, dayOfMonth, minutes;
	if ( !entryCount ) {
		return data;
	}
	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	firstDate = moment( entries[ 0 ].time_entry.date_at );
	firstDate.locale( locale );
	data.month = firstDate.month();
	data.year  = firstDate.year();
	for ( i = 0; i < entryCount; i++ ) {
		entry = entries[ i ].time_entry;
		day = moment( entry.date_at );
		// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
		day.locale( locale );
		if ( day.month() != firstDate.month() ) {
			continue;
		}
		minutes = getEntryMinutes( entry );
		data.total += minutes;
		week = day.week();
		dayOfMonth = day.date();
		data.weeks[ week ] = weekDefault.getData( data.weeks, week, minutes );
		data.weeks[ week ].days[ dayOfMonth ] = dayDefault.getData( data.weeks[ week ].days, dayOfMonth, minutes );
	}
	return data;
}

TimeAggregator.prototype.getAggregatedData = function () {
	if ( !this.aggregatedData ) {
		this.aggregatedData = calculateAggregatedData( this.entries, this.locale );
	}
	return this.aggregatedData;
};

TimeAggregator.prototype.getDays = function () {
	var days = {},
		day, week;
	if ( !this.aggregatedData ) {
		this.aggregatedData = calculateAggregatedData( this.entries, this.locale );
	}
	for ( week in this.aggregatedData.weeks ) {
		for ( day in this.aggregatedData.weeks[ week ].days ) {
			days[ day ] = this.aggregatedData.weeks[ week ].days[ day ];
		}
	}
	return days;
};

module.exports = TimeAggregator;
