export default class SettingsView {
	constructor( $el, store, actions, createServerConnector ) {
		this.$el = $el;
		this.store = store;
		this.createServerConnector = createServerConnector;
		this.actions = actions;

		this.store.subscribe( this.update.bind( this) );
		this.$el.find( '.submit' ).on( 'click', this.handleSubmit.bind( this ) );
	}

	update() {
		const state = this.store.getState();
		this.$el.find( '#api_key' ).val( state.settings.credentials.apiKey );
		this.$el.find( '#account' ).val( state.settings.credentials.account );
		this.$el.find( '#hours_per_week' ).val( state.settings.hoursPerWeek );
	}

	handleSubmit( evt ) {
		evt.preventDefault();
		let apiKey = this.$el.find( '#api_key' ).val(),
			account = this.$el.find( '#account' ).val(),
			hoursPerWeek = this.$el.find( '#hours_per_week' ).val();

		const state = this.store.getState();

		this.store.dispatch( this.actions.changeCredentials( { apiKey: apiKey, account: account } ) );

		// TODO validate hours per week to be >= 0
		this.store.dispatch( this.actions.configure( { hoursPerWeek: parseInt( hoursPerWeek, 10 ) } ) );

		let serverConnector = this.createServerConnector( state.settings, new XMLHttpRequest() );
		this.store.dispatch( this.actions.loadEntries( state.currentDate, serverConnector ) );
	}
}
