var Reflux = require( 'reflux-core' ),
	serverActions = Reflux.createActions( {
	load: { children: [ 'completed', 'failed' ] }
} );

module.exports = serverActions;
