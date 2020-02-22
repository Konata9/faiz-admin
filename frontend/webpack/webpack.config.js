const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { env: { SERVER_HOST, SERVER_PORT, APOLLO_HOST, APOLLO_PORT, APOLLO_PATH } } = process

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/index.tsx')
  ],
  output: {
    publicPath: '/',
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../frontend/dist'),
  },
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, '../config'),
      "@locale": path.resolve(__dirname, '../locale'),
      "@public": path.resolve(__dirname, '../public'),
      "@src": path.resolve(__dirname, '../src'),
      "@constants": path.resolve(__dirname, '../src/constants'),
      "@interface": path.resolve(__dirname, '../src/interface'),
      "@pages": path.resolve(__dirname, '../src/pages'),
      "@store": path.resolve(__dirname, '../src/store'),
      "@service": path.resolve(__dirname, '../src/service'),
      "@utils": path.resolve(__dirname, '../src/utils')
    },
    extensions: [".tsx", ".ts", ".js",],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Faiz Admin',
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        SERVER_HOST,
        SERVER_PORT,
        APOLLO_HOST,
        APOLLO_PORT,
        APOLLO_PATH
      }
    })
  ]
}