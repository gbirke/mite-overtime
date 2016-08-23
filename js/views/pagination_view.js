var moment = require( 'moment' );

export default class PaginationView {
	constructor( $prevElement, $nextElement, store, setDateAction ) {
		this.store = store;
		this.$prevElement = $prevElement;
		this.$nextElement = $nextElement;
		this.setDateAction = setDateAction;
		this.now = moment();

		store.subscribe( this.update.bind( this ) );
		$prevElement.on( 'click', this.handlePrevious.bind( this ) );
		$nextElement.on( 'click', this.handleNext.bind( this ) );
	}

	update () {
		const state = this.store.getState();
		const currentDate = state.currentDate ? moment( state.currentDate ) : moment();
		// TODO hide pagination when entries are empty
		if ( currentDate.isSame( this.now, 'month' ) ) {
			this.$nextElement.hide();
		} else {
			this.$nextElement.show()
		}

	}

	handlePrevious ( evt ) {
		const state = this.store.getState();
		let newDate = moment( state.currentDate );
		evt.preventDefault();
		this.store.dispatch( this.setDateAction( newDate.subtract( 1, 'month' ) ) );
	}

	handleNext ( evt ) {
		const state = this.store.getState();
		let newDate = moment( state.currentDate );
		evt.preventDefault();
		newDate.add( 1, 'month' );
		if ( newDate.isAfter( this.now, 'month' ) ) {
			return;
		}
		this.store.dispatch( this.setDateAction( newDate ) );
	}
}

