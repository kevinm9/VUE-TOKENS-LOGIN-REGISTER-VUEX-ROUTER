<template>
  <div class="submit-form">
      <div class="form-group">
          <label for="email">email</label>
          <input class="form-control" id="email" required v-model="user.email" name="email" />
      </div>

      <div class="form-group">
          <label for="password">password</label>
          <input class="form-control" id="password" required v-model="user.password" name="password" />
      </div>

      <button @click="loginUser" class="btn btn-success">Submit</button>

  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user-login",
  data() {
      return {
          user: {
              email: "",
              password: "",
          },
          submitted: false
      };
  },
  methods: {
      loginUser() {
          let data = {
              email: this.user.email,
              password: this.user.password
          };

          UserDataService.login(data)
              .then(response => {
                  console.log(response.data);
                  this.newuser();
              })
              .catch(e => {
                  console.log(e);
              });
      },

      newuser() {
          this.user = {};
      }
  }
};
</script>

<style></style>
