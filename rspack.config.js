const path = require('path');

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
	entry: {
		main: './src/index.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: 'umd',
			name: 'MarkdownRenderer',
		},
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		vue: 'Vue',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				type: 'javascript/auto',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				type: 'css',
			},
		],
	},
	optimization: {
		minimize: true,
	},
};
