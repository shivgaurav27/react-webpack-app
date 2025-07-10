const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
	const isDev = argv.mode === 'development';
	return {
		entry: './src/index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
		},
		mode: isDev ? 'development' : 'production',
		devtool: isDev ? 'inline-source-map' : false,
		devServer: {
			static: './dist',
			port: 3000,
			open: true,
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: 'babel-loader',
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					type: 'asset/resource',
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: './public/index.html',
			}),
		],
	};
};
