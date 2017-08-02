const path = require('path')
const webpack = require('webpack')
const srcDir = path.resolve(__dirname, 'src/')
const jsDir = path.resolve(__dirname, 'src/js/')
const vueDir = path.resolve(__dirname, 'src/js/vue')
const sassDir = path.resolve(__dirname, 'src/sass/')
const svgIconsDir = path.resolve(__dirname, 'src/svg-icons/')
const distDir = path.resolve(__dirname, './')
const nodeModulesDir = path.resolve(__dirname, './node_modules')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const extractSass = new ExtractTextPlugin({
  filename: '../css/main.css',
  disable: process.env.NODE_ENV === 'development'
})


module.exports = {
  context: __dirname,
  entry: [
    path.resolve(__dirname, 'src/js/index.js'),
    path.resolve(__dirname, 'src/sass/main.sass')
  ],
  output: {
    path: path.resolve(distDir, 'js'),
    filename: 'index.js'
  },
  devServer: {
    publicPath: '/js/',
    contentBase: distDir,
    hot: true
  },
  plugins: [
    new SpriteLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    extractSass
  ],
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
    alias: {
      icons: svgIconsDir,
      vue: 'vue/dist/vue.common.js',
      atoms: path.resolve(vueDir, 'atoms'),
      molecules: path.resolve(vueDir, 'molecules'),
      organisms: path.resolve(vueDir, 'organisms'),
      views: path.resolve(vueDir, 'views'),
      store: path.resolve(jsDir, 'store'),
      settings: path.resolve(jsDir, 'utils/settings')
    }
  }
}
