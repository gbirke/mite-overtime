var _ = require( 'lodash'),
	WorkWeek = require( '../domain/workweek'),
	Reflux = require( 'reflux-core' );

module.exports = {
	create: function ( settingsStore ) {
		return Reflux.createStore( {
			init: function () {
				this.listenTo( settingsStore, this.onSettings );
				this.workWeek = WorkWeek.createWorkWeek(
					settingsStore.workingDays,
					settingsStore.hoursPerWeek,
					settingsStore.holidayFunction
				);
				this.trigger( this.workWeek );
			},
			onSettings: function () {
				var newWorkWeek = WorkWeek.createWorkWeek(
					settingsStore.workingDays,
					settingsStore.hoursPerWeek,
					settingsStore.holidayFunction
				);
				if ( !_.isEqual( this.workWeek, newWorkWeek ) ) {
					this.workWeek = newWorkWeek;
					this.trigger();
				}
			}
		} );
	}
};
