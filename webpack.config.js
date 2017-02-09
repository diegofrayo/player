var path = require('path');

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
			exclude: /(node_modules|bower_components|dist)/,
			query: {
				presets: ['es2015', 'stage-2', 'react']
			},
			plugins: ['syntax-jsx']
		}, {
			test: /(\.js|.jsx)$/,
			loader: 'eslint-loader',
			exclude: /(node_modules|bower_components|dist)/
		}, {
			test: /\.css$/,
			loaders: [
				'style-loader',
				'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
				'postcss-loader'
			]
		}]
	},
	postcss: () => {
		return [
			require('postcss-modules-values'),
			require('postcss-nested'),
			require('postcss-simple-vars'),
			require('postcss-css-variables'),
			require('postcss-color-function')
			// require('postcss-import'),
			// require('postcss-mixins')
			// require('postcss-custom-properties'),
			// require('postcss-calc'),
			// require('postcss-math')
		];
	}
}