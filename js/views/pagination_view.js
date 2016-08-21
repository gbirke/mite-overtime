var moment = require( 'moment' );

module.exports = {
	create: function ( prevElement, nextElement, dateStore, commandActions ) {
		return Object.create( {
			init: function () {
				dateStore.listen( this.update );
				prevElement.on( 'click', this.handlePrevious );
				nextElement.on( 'click', this.handleNext );
			},
			update: function () {
				if ( dateStore.date.isSame( dateStore.now, 'month' ) ) {
					nextElement.addClass( 'disabled' );
				} else {
					nextElement.removeClass( 'disabled' );
				}

			},
			handlePrevious: function ( evt ) {
				var newDate = moment( dateStore.date );
				evt.preventDefault();
				commandActions.setDate( newDate.subtract( 1, 'month' ) );
			},
			handleNext: function ( evt ) {
				var newDate = moment( dateStore.date );
				evt.preventDefault();
				newDate.add( 1, 'month' );
				if ( newDate.isAfter( dateStore.now ) ) {
					return;
				}
				commandActions.setDate( newDate );
			}
		} );
	},
	createAndInit: function ( prevElement, nextElement, dateStore, commandActions ) {
		var view = this.create( prevElement, nextElement, dateStore, commandActions );
		view.init();
		return view;
	}
};
