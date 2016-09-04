var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
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
	plugins: [
		new webpack.EnvironmentPlugin(['APP_ENV','NODE_ENV'])
	],
	devServer: {
		contentBase: "./web"
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	}
};