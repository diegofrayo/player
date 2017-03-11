const path = require('path');

module.exports = {
	entry: './app/index.jsx',
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: [path.resolve('./app/')]
	},
	context: __dirname,
	output: {
		path: path.resolve(__dirname, 'dist/assets/player/js'),
		filename: 'webpack-bundle.js'
	},
	eslint: {
		configFile: './config.eslint.json'
	},
	module: {
		loaders: [{
			test: /(\.js|.jsx)$/,
			loader: 'babel',
			exclude: /(node_modules|dist)/,
			query: {
				presets: ['es2015', 'stage-2', 'react']
			},
			plugins: ['syntax-jsx']
		}, {
			test: /(\.js|.jsx)$/,
			loader: 'eslint-loader',
			exclude: /(node_modules|dist)/
		}, {
			test: /(\.css|.less)$/,
			loaders: [
				'style-loader',
				'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
				'less-loader'
			]
		}]
	}
}