const path = require( 'path' );

const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const ImageminMozjpeg = require( 'imagemin-mozjpeg' );

require( '@babel/register' );

const isProd = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

const paths = {
	SRC: path.resolve( __dirname, 'app' ),
	DIST: path.resolve( __dirname, 'dist' ),
};


// for all
const config = {
	entry: './app/index.js',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'index_bundle.js',
		publicPath: '/',
		chunkFilename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
	mode: 'development',
	devServer: {
		compress: true,
		historyApiFallback: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			minify: {
				useShortDoctype: true,
				removeRedundantAttributes: true,
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
			},
		}),
		new webpack.ProvidePlugin({
			THREE: 'three',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join( paths.SRC, '_redirects' ),
					to: path.join( paths.DIST ),
				},
				{
					from: path.join( paths.SRC, '_headers' ),
					to: path.join( paths.DIST ),
				},
				{
					from: path.join( paths.SRC, 'public' ),
					to: path.join( paths.DIST, 'public' ),
				},
			],
		}),
	],
};

if ( isProd ) {
	config.plugins = config.plugins.concat([
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					drop_debugger: true,
					drop_console: true,
				},
			},
		}),
		new ImageminPlugin({
			plugins: [
				ImageminMozjpeg({
					quality: 80,
					progressive: true,
				}),
			],
		}),
	]);
}

if ( process.env.ANALYZE ) {
	config.plugins.push( new BundleAnalyzerPlugin({
		defaultSizes: 'gzip',
	}) );
}

module.exports = config;
