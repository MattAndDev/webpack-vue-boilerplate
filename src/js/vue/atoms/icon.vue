<template>
  <svg class="i-logo-mark funnelHeader_logo">
    <use :xlink:href="unicorn.url"></use>
  </svg>
</template>
<script>

import unicorn from 'icons/unicorn.svg'

export default {
  name: 'icon',
  data () {
    return {
      iconName: String,
      className: String
    }
  },
}
</script>
