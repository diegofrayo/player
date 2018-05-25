const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ENVIRONMENT = process.env.NODE_ENV.trim();
let environmentConfig;
let extractLESS;
let isDevelopment = true;
let settings = {};

try {
	settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'))[ENVIRONMENT];
} catch (error) {
	console.log(error);
	process.exit();
}

const babelConfig = {
	test: /(\.js|.jsx)$/,
	exclude: /(node_modules|build)/,
	use: [
		{
			loader: 'babel-loader',
			options: {
				plugins: ['syntax-jsx'],
				presets: ['es2015', 'react'],
			},
		},
	],
};

if (ENVIRONMENT === 'development') {
	environmentConfig = require('./config/webpack.config.dev.js');
	babelConfig.use[0].options.plugins.unshift('react-hot-loader/babel');
	// babelConfig.use.unshift({ loader: 'react-hot-loader/webpack' });
	extractLESS = new ExtractTextPlugin({
		filename: 'styles.css',
		allChunks: true,
		disable: isDevelopment,
	});
} else {
	environmentConfig = require('./config/webpack.config.prod.js');
	extractLESS = new ExtractTextPlugin('styles.css');
	isDevelopment = false;
}

const plugins = [
	new webpack.LoaderOptionsPlugin({
		options: {
			eslint: {
				configFile: path.join(__dirname, './config.eslint.json'),
			},
		},
	}),
	extractLESS,
	new webpack.DefinePlugin({
		APP_SETTINGS: JSON.stringify(settings),
	}),
];

const entry = ['babel-polyfill', 'whatwg-fetch', './app/index.jsx'];

const config = Object.assign(
	{
		context: __dirname,
		resolve: {
			extensions: ['.js', '.jsx'],
			modules: [path.resolve(__dirname, 'app'), 'node_modules'],
		},
		module: {
			rules: [
				babelConfig,
				{
					exclude: /(node_modules|build)/,
					loader: 'eslint-loader',
					test: /(\.js|.jsx)$/,
				},
				{
					exclude: [/(node_modules|build)/, path.resolve(__dirname, 'app/styles/util.less')],
					test: /(\.less)$/,
					use: extractLESS.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									sourceMap: isDevelopment,
									importLoaders: true,
									modules: true,
									localIdentName: isDevelopment
										? '[path][name]_[local]_[hash:base64:3]'
										: '[hash:base64:5]',
									minimize: !isDevelopment,
								},
							},
							{
								loader: 'less-loader',
								options: {
									sourceMap: isDevelopment,
								},
							},
						],
					}),
				},
				{
					exclude: /(node_modules|build)/,
					test: [path.resolve(__dirname, 'app/styles/util.less')],
					use: extractLESS.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
							},
							{
								loader: 'less-loader',
							},
						],
					}),
				},
			],
		},
	},
	environmentConfig
);

config.plugins = plugins.concat(config.plugins);
config.entry = config.entry.concat(entry);

module.exports = config;
