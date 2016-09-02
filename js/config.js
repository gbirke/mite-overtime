var env = process.env.APP_ENV || 'development',

	config = {
		development: require( './configs/development.js' ),
		production: require( './configs/production.js' )
	};

if ( !env || !( env in config ) ) {
	throw new Error( 'Unknown value in APP_ENV: ' + env );
}

module.exports = config[ env ];
