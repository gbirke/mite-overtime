var Reflux = require( 'reflux-core' ),
	serverActions = require( '../actions/server' ),
	errorStore = Reflux.createStore( {
		init: function () {
			this.listenTo( serverActions.load.failed, this.onLoadFailed );
		},
		onLoadFailed: function ( errorData, xhr ) {
			this.errorMessage = errorData.error;
			this.lastXHR = xhr;
			this.trigger();
		},
		errorMessage: '',
		lastXHR: null
	} );

module.exports = errorStore;
