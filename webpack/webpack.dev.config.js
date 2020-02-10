const baseConfig = require('./webpack.config')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 2222,
    hot: true,
    proxy: {
      '/graphql': 'http://127.0.0.1:3333/graphql',
      '/api': 'http://127.0.0.1:3333/api'
    }
  }
}