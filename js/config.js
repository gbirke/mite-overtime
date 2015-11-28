var env = process.env.APP_ENV || 'development',

	config = {
		development: require( './configs/development.js' ),
		production: require( './configs/production.js' )
	};

module.exports = config[ env ];
