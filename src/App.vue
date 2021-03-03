<template>
  <div id="app">
    <keep-alive exclude="Profile">
      <router-view></router-view>
    </keep-alive>
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
  created() {
    if (sessionStorage.getItem('token')) {
      this.$store.dispatch("setToken", JSON.parse(sessionStorage.getItem('token')));
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
