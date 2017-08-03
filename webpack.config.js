// ============================================
// Webpack config
// ============================================
// this is the real webpack config
// please consider using external files before diving into this

// - webapack.settings.js
// - webapack.plugins.js

// core libs
const path = require('path')
const webpack = require('webpack')

// node_modules
const nodeModulesDir = path.resolve(__dirname, './node_modules')

// settings
const settings = require('./webpack.settings')

// settings
const plugins = require('./webpack.plugins')
module.exports = {
  context: __dirname,
  entry: settings.source.files,
  output: {
    path: settings.distribution.paths.js,
    filename: path.basename(settings.distribution.files.js)
  },
  devServer: {
    publicPath: '/js/',
    contentBase: settings.distribution.dir,
    hot: true
  },
  plugins: plugins.list,
  devtool: 'source-map',
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
              spriteFilename: path.relative(settings.source.paths.js, settings.distribution.files.svgSprite)
            }
          },
          'svgo-loader'
        ]
      },
      // sass
      {
        test: /\.sass$/,
        use: plugins.single.extractSass.extract({
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
    // alias piped from webpack.settings
    alias: settings.aliases
  }
}
