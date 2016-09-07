var path = require('path');
var webpack = require('webpack');

function configure( DEBUG ) { return {
	entry: [ './js/main' ],
	output: {
		path: path.resolve( __dirname, 'web/js' ),
		filename: 'app.js', // We could use filename hash for output
		publicPath: '/js/',
	},
	debug: DEBUG,
	cache: DEBUG,
	devtool: DEBUG && 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: path.join( __dirname, 'js' ),
				loader: 'babel-loader',
				query: {
					// TODO plugins transform runtime?
					presets: [ 'react' , 'es2015' ]
				}
			}
		]
	},
	plugins: DEBUG
		? [
			new webpack.DefinePlugin({'process.env.APP_ENV': '"development"'})
		]
		: [
			new webpack.DefinePlugin({
				'process.env.APP_ENV': '"production"',
				'process.env.NODE_ENV': '"production"'
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
				mangle: {screw_ie8: true, keep_fnames: true}
			}),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.AggressiveMergingPlugin()
		],
	devServer: {
		contentBase: "./web"
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	}
}; }

module.exports = configure( process.env.APP_ENV !== 'production' );