<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <nav-bar/>
  <main class="mx-5 min-vh-100">
    <router-view/>
  </main>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
}
</style>
