<template>
  <div class="card">
    <article class="card-body">
      <h4 class="card-title mb-4 mt-1">
        Register
      </h4>
      <form>
        <div class="form-group">
          <label>Your Name</label>
          <input
            id="name" 
            v-model="user.name" 
            class="form-control" 
            placeholder="name" 
            type="text"
            required
            name="name"
          >
        </div>
        <div class="form-group">
          <label>Your email</label>
          <input
            id="email" 
            v-model="user.email" 
            class="form-control" 
            placeholder="Email" 
            type="email"
            required
            name="email"
          >
        </div>
        <div class="form-group">
          <label>Your password</label>
          <input
            id="password" 
            v-model="user.password" 
            class="form-control" 
            placeholder="******" 
            type="password"
            required 
            name="password"
          >
        </div>
        <div class="form-group">
          <label>Confirm your password</label>
          <input
            id="confirm_password" 
            v-model="user.confirm_password" 
            class="form-control" 
            placeholder="******" 
            type="password"
            required 
            name="confirm_password"
          >
        </div>
        <div class="form-group">
          <div class="checkbox">
            <label> <input type="checkbox"> Save password </label>
          </div>
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary btn-block"
            @click="registerUser"
          >
            registrarse
          </button>
        </div>
      </form>
    </article>
  </div>
</template>
  
<script>
import UserService from '../services/user.service';

export default {
    name: "UserRegister",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                confirm_password:""
            }
        };
    },
    methods: {
        registerUser() {
            UserService.register(this.user)
                .then(
                    this.newuser()
                )
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
  