<template>
  <div>
    {{loggedIn}}
    <br>
    {{data}}
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
    }
  },methods: {
  registerUser() {
    AuthService.getUser(this.user)
                .then(response => {
                  this.data = response.data.data;
                    console.log(response.data);
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
