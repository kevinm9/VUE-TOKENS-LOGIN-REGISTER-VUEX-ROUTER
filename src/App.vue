<template>
  <div id="app" >
      <Navbar/>
      <router-view/>
  </div>
</template>

<script>
import Navbar from './components/NavBar'
import AuthService from './services/auth.service';

export default {
  name: "app",
  components: {
    Navbar
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth;
    },
  },
  methods: {
    logout(event) {
      event.preventDefault()
      AuthService.logout();
      location.reload();
    }
  }
};
</script>
