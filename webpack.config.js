const path = require('path')
const webpack = require('webpack')
const jsDir = path.resolve(__dirname, '.src/js/')
const sassDir = path.resolve(__dirname, '.src/sass/')
const distDir = path.resolve(__dirname, './')
const nodeModulesDir = path.resolve(__dirname, './node_modules')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: '../css/main.css',
  disable: process.env.NODE_ENV === 'development'
})


module.exports = {
  context: jsDir,
  entry: [path.resolve(__dirname, 'src/js/index.js'), path.resolve(__dirname, 'src/sass/main.sass')],
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
    new webpack.HotModuleReplacementPlugin(),
    extractSass
  ],
  module: {
    rules: [{
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
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
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
              includePaths: [path.resolve(nodeModulesDir, 'normalize.css')]
            }
          }
        ],
        fallback: 'style-loader'
      })
    }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.common.js',
      components: path.resolve(jsDir, 'components'),
      views: path.resolve(jsDir, 'views'),
      store: path.resolve(jsDir, 'store'),
      settings: path.resolve(jsDir, 'utils/settings')
    }
  }
}
