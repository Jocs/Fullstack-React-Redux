const fs = require('fs')

const babelrc = fs.readFileSync('./.babelrc')
var babelrcConfig

try {
	babelrcConfig = JSON.parse(babelrc)
} catch (e) {
	console.error(`read '.babelrc' file error`)
	console.error(e)
}
require('babel-polyfill')
require('babel-register')(babelrcConfig)
require('../server.js')
