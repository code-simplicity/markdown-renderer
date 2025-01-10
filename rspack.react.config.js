import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

/** @type {import('@rspack/cli').Configuration} */
export default {
  mode: 'development',
  entry: {
    main: './examples/react/main.tsx',
  },
  output: {
    path: path.resolve(process.cwd(), 'dist/react'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
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
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            cacheDirectory: true,
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
      react: path.resolve(process.cwd(), 'node_modules/react'),
      'react-dom': path.resolve(process.cwd(), 'node_modules/react-dom'),
    },
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.join(process.cwd(), 'examples/react'),
    },
    port: 8080,
    host: 'localhost',
    allowedHosts: 'all',
    client: {
      overlay: true,
      progress: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/react/index.html',
      inject: true,
    }),
  ],
};
