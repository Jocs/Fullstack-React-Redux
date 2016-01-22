import express from 'express'
import http from 'http'
import webpack from 'webpack'
import bodyParser from 'body-parser'
import menuRoute from './server/router'

// getProducts(products => {
// 	const data = products
// 	data.push({
// 		"id": 4,
// 		"title": "Surface",
// 		"price": 1119.99,
// 		"inventory": 67
// 	})
// 	setProducts(JSON.stringify(data, null, '\t'))
// })

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

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

})()

menuRoute(app)
// app.get('/products', (req, res) => {
// 	getProducts(products => {
// 		res.send(products)
// 	})
// })

// app.post('/products', (req, res) => {

// 	console.log(req.body)
// 	setProducts(JSON.stringify(req.body.products, null, '\t'))
// 	res.send(req.body)
// })

server.listen(process.env.PORT || PORT, () => {
	const address = server.address()
	const { port, family } = address
	console.log(`App listen on: ${family} at PORT: ${port}`)
	console.log(`TARGET: ${process.env.npm_lifecycle_event}`)
})

