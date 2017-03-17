const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: __dirname,
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
			loaders: [
				'style-loader',
				'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
				'less-loader'
			]
		}]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: {
					configFile: path.join(__dirname, './config.eslint.json')
				}
			}
		})
	]
}