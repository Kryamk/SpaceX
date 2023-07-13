const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
	mode,
	target,
	devtool,
	devServer: {
		static: {
			directory: path.join(__dirname, './dist'),
		},
		port: 3001,
		open: true,
		historyApiFallback: true,
	},
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		clean: true,
		filename: '[name].bundle.[contenthash].js',
		assetModuleFilename: 'assets/images/[name][ext]',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json', '.*.module.scss', '.jsx', '.d.ts']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			favicon: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
			minify: false,
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	],

	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								auto: /\.module\.\w+$/i,
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [!devMode ? require('postcss-preset-env') : ''],
							}
						}
					},
					"sass-loader",
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]'
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.svg$/i,
				type: 'asset',
				resourceQuery: /url/, // *.svg?url
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
				use: ['@svgr/webpack'],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env']
					}
				}
			}
		]
	}

};
