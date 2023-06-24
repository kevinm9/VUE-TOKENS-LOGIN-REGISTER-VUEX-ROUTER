<template>
  <nav class="navbar navbar-expand navbar-dark bg-primary">
    <router-link
      to="/"
      class="navbar-brand"
    >
      <img
        src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      >
      HOME
    </router-link>

    <ul class="navbar-nav mr-auto">
      <template v-if="loggedIn">
        <li class="nav-item">
          <router-link
            to="/tutorials"
            class="nav-link"
          >
            Tutorials
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/add"
            class="nav-link"
          >
            Add
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/profile"
            class="nav-link"
          >
            Profile
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/dashboard"
            class="nav-link"
          >
            dashboard
          </router-link>
        </li>
      </template>
    </ul>

    <ul class="nav navbar-nav navbar-right">
      <li
        v-if="!loggedIn"
        class="nav-item"
      >
        <router-link
          to="/login"
          class="nav-link"
        >
          <i class="bi bi-person-fill" /> login
        </router-link>
      </li>
      <li
        v-if="!loggedIn"
        class="nav-item"
      >
        <router-link
          to="/register"
          class="nav-link"
        >
          <i class="bi bi-person-plus" /> register
        </router-link>
      </li>
      <li
        v-if="loggedIn"
        class="nav-item"
      >
        <router-link
          to="/logout"
          class="nav-link"
        >
          <i class="bi bi-x-octagon" /> salir
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    loggedIn() {
      return this.$store.state.auth.user?.token;
    },
  },
};
</script>
<style scoped>
.navigation {
  background: #0e1a35;
}
</style>
