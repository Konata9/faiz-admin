const baseConfig = require('./webpack.config')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'source-map',
}