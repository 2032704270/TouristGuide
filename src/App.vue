<template>
  <div id="app">
    <router-view key="key"></router-view>
    <main-tabbar v-if="checkPath()"></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from './components/tabBar/MainTabbar'
export default {
  name: 'App',
  components: {MainTabbar},
  data() {
    return {
      path: [
          '/home',
          '/profile',
          '/profile/',
      ],
    }
  },
  methods: {
    checkPath() {
      for (let i = 0 ; i < this.path.length ; i++) {
        if (this.$route.path.indexOf(this.path[i]) === 0) {
          return true;
        }
      }
      return false;
    }
  }
}
</script>

<style>
@import url('./assets/css/base.css');
</style>
