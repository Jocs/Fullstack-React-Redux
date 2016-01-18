const webpack = require('webpack')

module.exports = {
	devtool: 'source-map',
	output: {
		publicPath: 'dist/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'precess.env': {
				NODE_ENV: '"production"'
			},
			__DEVELOPMENT__: false
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}