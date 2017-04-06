const path = require('path');

module.exports = {
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, '../build'),
		historyApiFallback: true,
		host: 'localhost',
		hot: true,
		port: 4567
	},
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '../build/assets/player/js/'),
		publicPath: '/assets/player/'
	},
	plugins: []
};