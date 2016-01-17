import express from 'express'
import http from 'http'
import webpack from 'webpack'

const app = express()
const server = http.createServer(app)
const PORT = 3000;

(function initWebpack() {
	const config = require('./webpack/common.config')
	const compiler = webpack(config)

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true, publicPath: config.output.publicPath
	}))
	app.use(require('webpack-hot-middleware')(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}))
	app.use(express.static(__dirname + '/'))
})()

app.use(/.*/, (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

server.listen(process.env.PORT || PORT, () => {
	const address = server.address()
	const { port } = address
	console.log(`App listen on: ${address} at PORT: ${port}`)
	console.log(`TARGET: ${process.env.npm_lifecycle_event}`)
})