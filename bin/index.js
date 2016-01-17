const fs = require('fs')

const babelrc = fs.readFileSync('./.babelrc')
var babelrcConfig

try {
	babelrcConfig = JSON.parse(babelrc)
} catch(e) {
	console.log(`read '.babelrc' file error`)
	console.log(e)
}

require('babel-register')(babelrcConfig)
require('../server.js')
