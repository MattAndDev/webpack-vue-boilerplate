<template>
  <svg class="i-funnel-close funnelHeader_close">
    <use :xlink:href="this.icon.url"></use>
  </svg>
</template>
<script>


export default {
  name: 'icon',
  data () {
    return {
      icon: Object
    }
  },
  props: [
    'iconName'
  ],
  mounted () {
    this.icon = require(`icons/${this.iconName}.svg`).default
  }
}
</script>
