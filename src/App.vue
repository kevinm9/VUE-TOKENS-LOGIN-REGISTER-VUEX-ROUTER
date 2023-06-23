<template>
  <div id="app">
      <Navbar/>
      <router-view/>
  </div>
</template>

<script>
import Navbar from './components/NavBar'
export default {
  name: "app",
  components: {
    Navbar
  },
};
</script>
