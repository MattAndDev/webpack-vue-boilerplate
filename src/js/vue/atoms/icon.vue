<template>
  <svg :class="'icon ' + classes">
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
    'iconName',
    'classes'
  ],
  mounted () {
    this.icon = require(`icons/${this.iconName}.svg`).default
  }
}
</script>
