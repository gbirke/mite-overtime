var objectAssign = require( 'object-assign' ),
	_ = require( 'lodash' ),
	moment = require( 'moment' ),
	Day = require( './domain/day' ),

	/**
	 * Convert Mite time entries to a Day domain object collection
	 * @class
	 */
	EntriesToDaysConverter = {
		locale: 'en',
		workdayCalculator: null,
		getDaysFromEntries: function ( entries ) {
			var self = this;
			return _.reduce( entries, function ( days, entry ) {
				// TODO Add method to determine if entry should counted against working hours (e.g. compensatory time-off)
				var date = self.getDateForEntry( entry ),
					dayOfMonth = date.date();

				if ( !_.has( days, dayOfMonth ) ) {
					days[ dayOfMonth ] = self.getDayFromEntry( entry );
				}
				days[ dayOfMonth ].addWorkMinutes( self.getMinutesFromEntry( entry ) );
				return days;
			}, {} );
		},
		getDayFromEntry: function ( entry ) {
			var date = this.getDateForEntry( entry );
			if ( this.workdayCalculator.isWorkDay( date ) ) {
				return Day.createWorkDay( date );
			} else {
				return Day.createHolyDay( date );
			}

		},
		// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
		getDateForEntry: function ( entry ) {
			var date = moment( entry.time_entry.date_at );
			date.locale( this.locale );
			return date;
		},
		getMinutesFromEntry: function ( entry ) {
			if ( entry.time_entry.tracking ) {
				return entry.time_entry.tracking.minutes;
			} else {
				return entry.time_entry.minutes;
			}
		}
		// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	};

module.exports = {
	createEntriesToDaysConverter: function ( workdayCalculator, locale ) {
		return objectAssign( Object.create( EntriesToDaysConverter ), {
			workdayCalculator: workdayCalculator,
			locale: locale
		} );
	}
};
