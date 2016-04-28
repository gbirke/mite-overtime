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
				var dateString = self.getDateStringForEntry( entry );

				if ( !_.has( days, dateString ) ) {
					days[ dateString ] = self.getDayFromEntry( entry );
				}
				days[ dateString ].addWorkMinutes( self.getMinutesFromEntry( entry ) );
				return days;
			}, {} );
		},
		getDayFromEntry: function ( entry ) {
			var date = this.getLocalizedDate( this.getDateStringForEntry( entry ) );
			if ( this.workdayCalculator.isWorkDay( date ) ) {
				return Day.createWorkDay( date );
			} else {
				return Day.createHolyDay( date );
			}

		},
		getLocalizedDate: function ( dateString ) {
			var date = moment( dateString );
			date.locale( this.locale );
			return date;
		},
		// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
		getDateStringForEntry: function ( entry ) {
			return entry.time_entry.date_at;
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
