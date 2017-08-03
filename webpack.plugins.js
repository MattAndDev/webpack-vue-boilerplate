// ============================================
// Webpack plugins
// ============================================
// handling plugin setup for the webpack config

// core
const webpack = require('webpack')
const path = require('path')

// settings
const settings = require('./webpack.settings')

// svg-sprite-loader used as plugin to enable extracting features
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
// Create the extract sass plugin
// ============================================
// used to write css to file in production
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: path.relative(settings.source.dir, settings.distribution.files.css),
  // disbale if developemnt mode // falls back to style-loader
  disable: process.env.NODE_ENV === 'development'
})


const HtmlWebpackPlugin = require('html-webpack-plugin');
const writeHtmlFiles = new HtmlWebpackPlugin({
  title: 'My App',
  filename: path.resolve(__dirname, './html/index.html'),
  template: path.resolve(__dirname, './src/html/index.html')
})

// export plugins to be fed into webpack.config.plugins
module.exports = {
  get list () {
    return [
      // core webpack
      new webpack.HotModuleReplacementPlugin(),
      // others
      new SpriteLoaderPlugin(),
      writeHtmlFiles,
      extractSass
    ]
  },
  single: {
    extractSass: extractSass
  }
}
