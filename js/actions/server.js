var Reflux = require( 'reflux-core' ),
	ServerConnector = require( '../server_connector.js' ),	
 	serverActions = Reflux.createActions( {
    'load': { children: [ 'completed', 'failed' ] }
} );

serverActions.load.listen( function ( args ) {
	console.log( "server load" );
	console.log(args);
} );

module.exports = serverActions;