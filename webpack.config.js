// ============================================
// Main webpack config file
// ============================================

// core libs
const path = require('path')
const webpack = require('webpack')
// node_modules
const nodeModulesDir = path.resolve(__dirname, './node_modules')
// settings
const settings = require('./webpack.settings')


const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const extractSass = new ExtractTextPlugin({
  filename: '../css/main.css',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  context: __dirname,
  entry: settings.source.files,
  output: {
    path: settings.distribution.paths.js,
    filename: settings.distribution.files.js
  },
  devServer: {
    publicPath: '/js/',
    contentBase: settings.distribution.dir,
    hot: true
  },
  plugins: [
    new SpriteLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    extractSass
  ],
  devtool: "source-map",
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: ['transform-class-properties']
          }
        }]
      },
      // Vue <3
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // svg
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: '../images/svg-icons.svg'
            }
          },
          'svgo-loader'
        ]
      },
      // sass
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [ path.resolve(nodeModulesDir, 'normalize.css') ]
              }
            }
          ],
          fallback: 'style-loader'
        })
      },

    ]
  },
  // resolvign rules
  resolve: {
    alias: settings.aliases
  }
}
