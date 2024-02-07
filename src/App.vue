<template>
  <nav-bar />
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/navBar/NavBar.vue"

export default {
  components: {
    NavBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>