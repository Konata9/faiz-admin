const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
      "@modules": path.resolve(__dirname, '../src/modules'),
      "@store": path.resolve(__dirname, '../src/store'),
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
        test: /\.js$/,
        use: 'babel-loader',
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
    })
  ]
}