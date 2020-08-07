<template>
  <div id="app">
     <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Microsoft JhengHei', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
