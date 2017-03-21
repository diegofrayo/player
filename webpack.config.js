const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const extractLESS = new ExtractTextPlugin('../css/styles.css');

module.exports = {
	context: __dirname,
	devtool: 'source-map',
	entry: './app/index.jsx',
	output: {
		filename: 'webpack-bundle.js',
		path: path.resolve(__dirname, 'build/assets/player/js'),
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
				use: ['css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]', 'less-loader']
			})
		}]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: {
					configFile: path.join(__dirname, './config.eslint.json')
				}
			}
		}),
		extractLESS
	]
}