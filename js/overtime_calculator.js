var moment = require( 'moment' ),
	TotalsObjectAggregator = require( './totals_object_aggregator' ),
	weekDefault = new TotalsObjectAggregator( { days: {} } ),
	dayDefault = new TotalsObjectAggregator( {} );

function OvertimeCalculator() {}

OvertimeCalculator.prototype.getOvertime = function ( timeData, minutesPerDay ) {
	var overtime = {
			total: 0,
			weeks: {}
		},
		week, day, timeDifference;
	for ( week in timeData.weeks ) {
		for ( day in timeData.weeks[ week ].days ) {
			timeDifference = timeData.weeks[ week ].days[ day ].total - minutesPerDay;
			overtime.total += timeDifference;
			overtime.weeks[ week ] = weekDefault.getData( overtime.weeks, week, timeDifference );
			overtime.weeks[ week ].days[ day ] = dayDefault.getData( overtime.weeks[ week ].days, day, timeDifference );
		}
	}
	return overtime;

};

module.exports = OvertimeCalculator;
