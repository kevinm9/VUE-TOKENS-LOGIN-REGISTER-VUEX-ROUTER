<template>
  <div>
    {{loggedIn}}
    <br>
    {{data}}
    <br>
    token sin getters de vuex:
    <br>
    {{token}}
  </div>
</template>

<script>
import AuthService from '../services/auth.service';
export default {
  name: "user-profile",
  data() {
        return {
            data: "",
        };
    },
  computed: {
    loggedIn() {
      //return this.$store.state.auth.user;
      return this.$store.getters['auth/user'];
    },
    token() {
      //return this.$store.state.auth.user;
      return this.$store.state.auth.user.token;
    }
  },methods: {
  registerUser() {
    AuthService.getUser(this.user)
                .then(response => {
                  this.data = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });
    }
  },
  mounted() {
    this.registerUser();
  }
};
</script>
