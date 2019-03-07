<template>
  <i :class="'menu-icon ' + iconClass">
  </i>
</template>

<script>
export default {
  name: 'MyIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.menu-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #f4f4f5;
  margin-right: 16px;
}
</style>
