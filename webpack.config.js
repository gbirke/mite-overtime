var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'babel-polyfill',
		'./js/main'
	],
	output: {
		path: path.resolve( __dirname, 'web/js' ),
		filename: 'app.js',
		publicPath: '/js/',
	},
	debug: true,
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: path.join( __dirname, 'js' ),
				loader: 'babel-loader',
				query: {
					presets: [ 'react' , 'es2015' ]
				}
			}
		]
	},
	devServer: {
		contentBase: "./web"
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	}
};