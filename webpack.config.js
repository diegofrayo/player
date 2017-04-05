const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const extractLESS = new ExtractTextPlugin('./../css/styles.css');

const ENVIRONMENT = process.env.NODE_ENV.trim();
let settings = {};

try {
	settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'))[ENVIRONMENT];
} catch (error) {
	process.exit();
}

const plugins = [
	new webpack.LoaderOptionsPlugin({
		options: {
			eslint: {
				configFile: path.join(__dirname, './config.eslint.json')
			}
		}
	}),
	extractLESS,
	new webpack.DefinePlugin({
		APP_SETTINGS: JSON.stringify(settings)
	})
];

if (ENVIRONMENT === 'production') {
	plugins.concat([,
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]);
}

module.exports = {
	context: __dirname,
	devtool: ENVIRONMENT === 'development' ? 'source-map' : '',
	devServer: {
		contentBase: __dirname + '/build',
		historyApiFallback: true,
		host: 'localhost',
		port: 4567
	},
	entry: ['babel-polyfill', 'whatwg-fetch', './app/index.jsx'],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/build/assets/player/js/',
		publicPath: '/assets/player/'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [path.resolve(__dirname, 'app'), 'node_modules']
	},
	module: {
		rules: [{
			test: /(\.js|.jsx)$/,
			exclude: /(node_modules|build)/,
			use: {
				loader: 'babel-loader',
				options: {
					plugins: ['syntax-jsx'],
					presets: ['es2015', 'stage-2', 'react']
				}
			}
		}, {
			exclude: /(node_modules|build)/,
			loader: 'eslint-loader',
			test: /(\.js|.jsx)$/
		}, {
			exclude: /(node_modules|build)/,
			test: /(\.less)$/,
			use: extractLESS.extract({
				fallback: 'style-loader',
				use: ['css-loader?modules&importLoaders=2&localIdentName=[name]_[local]_[hash:base64:5]', 'less-loader']
			})
		}]
	},
	plugins
};