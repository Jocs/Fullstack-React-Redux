const webpack = require('webpack')

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: ['webpack-hot-middleware/client', './src/index.js'],
	output: {
		publicPath: '/dist/'
	},
	plugins: [
		new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"development"',
	      },
	      __DEVELOPMENT__: true,
	    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}