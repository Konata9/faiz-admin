const baseConfig = require('./webpack.config')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    port: 2222,
    hot: true,
    historyApiFallback: true,
  }
}