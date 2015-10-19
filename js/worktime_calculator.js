var moment = require( 'moment' );

function WorkdaysCalculator( workdays ) {
	var i;
	this.workdays = workdays;
	this.workdaysIndex = [];
	for ( i = 0; i < 7; i++ ) {
		this.workdaysIndex[ i ] = workdays.indexOf( i ) > -1;
	}
}

WorkdaysCalculator.prototype.getWorkdaysForWeek = function ( week, month ) {
	var firstDayOfWeek, nextWeek, dayPointer, dayBelongsToWeek,
		dayCount = 0;
	firstDayOfWeek = moment( week, 'w' );
	nextWeek = moment( week, 'w' ).add( 7, 'days' );
	if ( firstDayOfWeek.month() === nextWeek.month() ) {
		return this.workdays.length;
	}
	dayPointer = firstDayOfWeek;
	while ( dayPointer.diff( nextWeek, 'days' ) < 0 ) {
		if ( this.workdaysIndex[ dayPointer.day() ] && dayPointer.month() == month ) {
			dayCount += 1;
		}
		dayPointer.add( 1, 'day' );
	}
	return dayCount;
};

module.exports = WorkdaysCalculator;
