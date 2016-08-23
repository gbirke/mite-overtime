import { stateHasChanged, updateProperties } from './util/property_watcher'

export default class ErrorView {
	constructor( $element, store ) {
		this.$el = $element;
		this.store = store;
		this.props = {
			loadError: ''
		};

		store.subscribe( this.update.bind( this ) );
	}

	update() {
		const state = this.store.getState();
		if ( !stateHasChanged( this.props, state ) ) {
			return;
		}
		this.props = updateProperties( this.props, state );
		this.$el.text( this.props.loadError );
		if ( this.props.loadError === '') {
			this.$el.hide();
		} else {
			this.$el.show();
		}

	}
}
