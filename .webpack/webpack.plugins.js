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
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')


// Create the extract sass plugin
// ============================================

// used to write css to file in production
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: path.relative(settings.distribution.dir, settings.distribution.files.css),
  // disbale if developemnt mode // falls back to style-loader
  disable: process.env.NODE_ENV === 'development'
})


// Create the write html files plugin
// ============================================

const HtmlWebpackPlugin = require('html-webpack-plugin')
const writeHtmlFiles = new HtmlWebpackPlugin({
  inject: false,
  filename: settings.distribution.files.html,
  template: settings.source.files.html,
  alwaysWriteToDisk: true,
  cache: false
})
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')


// Babili for js minification
const BabiliPlugin = require('babili-webpack-plugin')

const basePlugins = [
  // others
  new SpriteLoaderPlugin(),
  writeHtmlFiles,
  new HtmlWebpackHarddiskPlugin(),
  extractSass
]

const devPlugins = [
  new webpack.HotModuleReplacementPlugin()
]

const buildPlugins = [
  new BabiliPlugin()
]

let plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins = basePlugins.concat(buildPlugins)
}
else {
  plugins = basePlugins.concat(devPlugins)
}


// export plugins to be fed into webpack.config.plugins
module.exports = {
  get list () {
    return plugins
  },
  single: {
    extractSass: extractSass
  }
}
