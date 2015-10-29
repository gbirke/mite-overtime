// Convert object data into array data that is interpretable by D3

function DataConverter() {}

DataConverter.prototype.convert = function ( data ) {
	var converted = {
		total: data.total,
		timeDelta: data.timeDelta,
		weeks: [],
		year: data.year,
		month: data.month
	},
	week, day, weekData, dayData;
	for ( week in data.weeks ) {
		weekData = {
			total: data.weeks[ week ].total,
			timeDelta: data.weeks[ week ].timeDelta,
			week: week,
			days: []
		};

		for ( day in data.weeks[ week ].days ) {
			dayData = {
				total: data.weeks[ week ].days[ day ].total,
				timeDelta: data.weeks[ week ].days[ day ].timeDelta,
				day: day,
				date: [ data.year, '-', data.month + 1, '-', day ].join( '' )
			};
			weekData.days.push( dayData );
		}

		converted.weeks.push( weekData );
	}
	return [ converted ];
};

module.exports = DataConverter;
