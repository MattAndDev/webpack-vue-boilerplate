import Vue from 'vue'
import App from './app.vue'
import router from './router'
import VueResource from 'vue-resource'

// $.ready
let domReady = function (callback) {
  document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback)
}

domReady(() => {
  console.log('rere');
  // Vue.config.devtools = false
  const app = new Vue({
    el: '#App',
    router,
    template: '<App/>',
    components: { App }
  })
  Vue.use(VueResource)
})
