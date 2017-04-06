const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	output: {
		filename: 'bundle.[hash].js',
		path: path.join(__dirname, '../build/assets/player/js/'),
		publicPath: '/assets/player/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new CleanWebpackPlugin(['build'], {
			root: path.join(__dirname, '../'),
			verbose: true,
			dry: false
		})
	]
};