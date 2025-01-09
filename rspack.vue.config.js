import path from 'path';

export default {
	entry: './examples/vue/main.js',
	output: {
		path: path.resolve(process.cwd(), 'dist/vue'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.vue'],
	},
	devtool: 'source-map',
	builtins: {
		vue: {
			development: true
		}
	}
};
