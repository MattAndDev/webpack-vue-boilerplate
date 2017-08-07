// ============================================
// Webpack config
// ============================================
// this is the real webpack config
// please consider using external files before diving into this

// to manage folder structure and filenamse use:
// webapack.settings.js

// to manage plugins use:
// webapack.plugins.js

// core libs
const path = require('path')
const webpack = require('webpack')

// settings
const settings = require('./webpack.settings')

// node_modules
const nodeModulesDir = path.resolve(settings.baseDir, './node_modules')

// plugins
const plugins = require('./webpack.plugins')


module.exports = {
  // general setup from external files
  context: __dirname,
  entry: settings.source.entries,
  output: {
    path: settings.distribution.dir,
    filename: path.relative(settings.distribution.dir, settings.distribution.files.js),
    publicPath: '/'
  },
  devServer: {
    contentBase: settings.distribution.dir,
    hotOnly: true,
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
              spriteFilename: path.relative(settings.distribution.dir, settings.distribution.files.svgSprite)
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
      }
    ]
  },
  // resolvign rules
  resolve: {
    // alias piped from webpack.settings
    alias: settings.aliases
  }
}
