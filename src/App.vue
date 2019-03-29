<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    console.log(process.env)
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }


</style>
