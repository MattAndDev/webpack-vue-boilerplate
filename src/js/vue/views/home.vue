<template>
  <div ref='home' class="home">
    <div class="u-cw">
      <h1>Webpack-vue unicorns</h1>
      <icon icon-name="unicorn" classes="my_unicorn_icon"></icon>
    </div>
  </div>
</template>
<script>

import Icon from 'atoms/icon.vue'

export default {
  name: 'home',
  components: {
    Icon
  }
}
</script>
