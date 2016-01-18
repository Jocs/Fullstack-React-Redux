const path = require('path')
const merge = require('webpack-merge')
const development = require('./dev.config')
const production = require('./prod.config')

const TARGET = process.env.npm_lifecycle_event
const PATH = {
	app: path.join(__dirname, '../src'),
	build: path.join(__dirname, '../dist')
}

require('babel-polyfill')

process.env.BABEL_ENV = TARGET

const common = {
	entry: [PATH.app],
	output: {
		path: PATH.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel'
		},{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(woff|woff2|ttf|svg)$/,
			loader: 'url?limit=100000'
		}, {
			test: /\.(eot|png)$/,
			loader: 'file'
		}]
	}
}

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, development)
}
if(TARGET === 'build' || !TARGET) {
	module.exports = merge(common, production)
}
