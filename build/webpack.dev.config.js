const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
		contentBase: '../dist',
		open: true,
		port: 8080,
		hot: true
	},
	entry: {
		main: './src/code/scripts/main.js',
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/code/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
        }),
        new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors',
                }
            }
        }
	},
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist')
    }
}