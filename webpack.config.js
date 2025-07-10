const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
	const isDev = argv.mode === 'development';
	return {
		entry: './src/index.js',
		output: {
			filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
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
		optimization: {
			minimize: !isDev,
			minimizer: ['...', new CssMinimizerPlugin()],
			splitChunks: {
				chunks: 'all',
			},
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: './public/index.html',
			}),
			new BundleAnalyzerPlugin(),
			!isDev &&
				new CompressionPlugin({
					algorithm: 'gzip',
					test: /\.(js|css|html|svg)$/,
				}),
		].filter(Boolean),
	};
};
