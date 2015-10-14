var moment = require('moment');

function TimeAggregator( rawEntries ) {
	this._entries = rawEntries;
}

TimeAggregator.prototype.getAggregatedData = function() {
	var data = {
		total: 0
	}, 
	entryCount = this._entries.length,
	i, entry, day, firstDate;
	if ( !entryCount ) {
		return data;
	}
	firstDate = moment( this._entries[0].time_entry.date_at );
	for ( i=0; i < entryCount; i++ ) {
		entry = this._entries[i].time_entry;
		day = moment( entry.date_at );
		if ( day.month() != firstDate.month() ) {
			continue;
		}
		data.total += entry.minutes;
	}
	return data;
}

module.exports = TimeAggregator