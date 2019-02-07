var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var browserConfig = {
  entry: ['babel-polyfill','./src/browser/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use:[
          { loader:"style-loader"},
          {
            loader:"css-loader",
            options:{
              modules:true,
              importLoaders:1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
				      sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|woff|woff2|mp4|eot|ttf)$/,
        loader: 'file-loader',
        options: {
            emit: false
            }
        }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

var serverConfig = {
  entry: ['babel-polyfill','./src/server/index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use:[
          { loader:"isomorphic-style-loader"},
          {
            loader:"css-loader",
            options:{
              modules:true,
              importLoaders:1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
				      sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|woff|woff2|mp4|eot|ttf)$/,
        loader: 'file-loader',
        options: {
            emit: false
            }
        }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [browserConfig, serverConfig]