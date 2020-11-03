<template>
    <div id="app">
        <app-header v-bind:msg="title"></app-header>
        <div id="body">
            <router-view></router-view>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
      'app-header': Header,
      'app-footer': Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#body{
    display:flex;
    flex-direction:column;
    justify-content:center;
}
</style>
