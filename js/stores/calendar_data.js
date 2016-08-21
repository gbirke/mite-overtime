var _ = require( 'lodash' ),
	CalendarDataGenerator = require( '../calendar_data_generator' ),
	Reflux = require( 'reflux-core' );

module.exports = {
	create: function ( dateStore, settingsStore, workweekStore ) {
		return Reflux.createStore( {
			init: function () {
				this.listenTo( dateStore, this.onDate );
				this.listenTo( settingsStore, this.onLocale );
				this.listenTo( workweekStore, this.onWorkWeek );
				this.calendarDataGenerator = new CalendarDataGenerator( workweekStore.workWeek, settingsStore.locale );
				this.calendarData = this.calendarDataGenerator.generateData( dateStore.getYear(), dateStore.getMonth() );
			},
			onDate: function () {
				this.generateData();
			},
			onLocale: function () {
				if ( this.calendarDataGenerator.locale !== settingsStore.locale ) {
					this.calendarDataGenerator.locale = settingsStore.locale;
					this.generateData();
				}
			},
			onWorkWeek: function () {
				this.calendarDataGenerator.workWeek = workweekStore.workWeek;
				this.generateData();
			},
			generateData: function () {
				this.calendarData = this.calendarDataGenerator.generateData( dateStore.getYear(), dateStore.getMonth() );
				this.trigger();
			}
		} );
	}
};
