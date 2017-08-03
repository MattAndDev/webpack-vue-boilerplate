// ============================================
// Webpack settings
// ============================================

// To hide a bit of the webspack config complexity
// improtant variables are exposed in this files

// import path resolve as shortcut
const res = require('path').resolve

module.exports = {

  // source paths and files
  source: {
    dir: res(__dirname, 'src/'),
    get paths () {
      return {
        js: res(this.dir, 'js/'),
        vue: res(this.dir, 'js/vue'),
        sass: res(this.dir, 'sass/'),
        svg: res(this.dir, 'svg-icons/')
      }
    },
    // returns an array iped directly into webpacks `entry` option
    get files () {
      return [
        res(this.paths.js, 'index.js'),
        res(this.paths.sass, 'main.sass')
      ]
    }
  },

  // distribution paths and files
  distribution: {
    dir: res(__dirname, './'),
    get paths () {
      return {
        js: res(this.dir, 'js/'),
        css: res(this.dir, 'css/')
      }
    },
    get files () {
      return {
        css: res(this.paths.css, 'main.css'),
        // only filename accepted
        js: 'index.js'
      }
    },
  },

  // aliases for webpack
  get aliases () {
    return {
      icons: this.source.paths.svg,
      vue: 'vue/dist/vue.common.js',
      atoms: res(this.source.paths.vue, 'atoms'),
      molecules: res(this.source.paths.vue, 'molecules'),
      organisms: res(this.source.paths.vue, 'organisms'),
      views: res(this.source.paths.vue, 'views'),
      store: res(this.source.paths.js, 'store'),
      settings: res(this.source.paths.js, 'utils/settings')
    }
  }
}
