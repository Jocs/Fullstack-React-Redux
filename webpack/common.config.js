const path = require('path')
const merge = require('webpack-merge')
const development = require('./dev.config')

const TARGET = process.env.npm_lifecycle_event
const PATH = {
	app: path.join(__dirname, '../src'),
	build: path.join(__dirname, '../dist')
}

require('babel-polyfill')

process.env.BABEL_ENV = TARGET

const common = {
	entry: PATH.app,
	
}
