<template>
  <div ref='home' class="home">
    <div class="u-cw">
      <h1>home</h1>
      <svg class="i-logo-mark funnelHeader_logo">
        <use :xlink:href="unicorn.url"></use>
      </svg>
    </div>
  </div>
</template>
<script>

import Icon from 'atoms/icon.vue'

export default {
  name: 'home',
  components: {
    Icon
  },
  data () {
    return {
      unicorn: unicorn
    }
  },
}
</script>
