const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const ENVIRONMENT = process.env.NODE_ENV.trim();
let environmentConfig;
let extractLESS;
let settings = {};

try {
	settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'))[ENVIRONMENT];
} catch (error) {
	process.exit();
}

if (ENVIRONMENT === 'development') {
	environmentConfig = require('./config/webpack.config.dev.js');
	extractLESS = new ExtractTextPlugin('./../css/styles.css');
} else {
	environmentConfig = require('./config/webpack.config.prod.js');
	extractLESS = new ExtractTextPlugin('./../css/styles.[hash].css');
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

const config = Object.assign({
	context: __dirname,
	entry: [
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		'babel-polyfill',
		'whatwg-fetch',
		'./app/index.jsx'
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [path.resolve(__dirname, 'app'), 'node_modules']
	},
	module: {
		rules: [{
			test: /(\.js|.jsx)$/,
			exclude: /(node_modules|build)/,
			use: [{
				loader: 'react-hot-loader/webpack'
			}, {
				loader: 'babel-loader',
				options: {
					plugins: ['react-hot-loader/babel','syntax-jsx'],
					presets: ['es2015', 'react']
				}
			}]
		}, {
			exclude: /(node_modules|build)/,
			loader: 'eslint-loader',
			test: /(\.js|.jsx)$/
		}, {
			exclude: /(node_modules|build)/,
			test: /(\.less)$/,
			loader: ['style-loader', 'css-loader?modules&sourceMap&importLoaders=2&localIdentName=[name]_[local]_[hash:base64:5]', 'less-loader?sourceMap'].join('!')
		}]
	},
}, environmentConfig);

config.plugins = plugins.concat(config.plugins);

module.exports = config;