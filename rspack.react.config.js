import path from 'path';

export default {
	mode: 'development',
	entry: {
		main: './examples/react/main.tsx'
	},
	output: {
		path: path.resolve(process.cwd(), 'dist/react'),
		filename: '[name].bundle.js',
		publicPath: '/',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|tsx?)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript'
						],
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
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@': path.resolve(process.cwd(), 'src'),
		},
	},
	devtool: 'source-map',
	devServer: {
		hot: true,
		open: true,
		static: {
			directory: path.join(process.cwd(), 'examples/react'),
			publicPath: '/',
			serveIndex: true,
			watch: true,
		},
		historyApiFallback: true,
		compress: true,
		port: 8084,
		host: 'localhost',
		client: {
			overlay: true,
		},
		setupMiddlewares: (middlewares, devServer) => {
			if (!devServer) {
				throw new Error('webpack-dev-server is not defined');
			}
			return middlewares;
		}
	}
}
