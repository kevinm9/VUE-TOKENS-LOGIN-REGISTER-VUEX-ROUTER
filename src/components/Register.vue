<template>

        <div class="card">
            <article class="card-body">
                <h4 class="card-title mb-4 mt-1">Register</h4>
                <form>
                    <div class="form-group">
                        <label>Your Name</label>
                        <input class="form-control" 
                        placeholder="name" 
                        type="text" 
                        id="name" 
                        required
                        v-model="user.name" name="name" />
                    </div>
                    <div class="form-group">
                        <label>Your email</label>
                        <input class="form-control" 
                        placeholder="Email" 
                        type="email" 
                        id="email" 
                        required
                        v-model="user.email" name="email" />
                    </div>
                    <div class="form-group">
                        <label>Your password</label>
                        <input class="form-control" 
                        id="password" 
                        placeholder="******" 
                        type="password" 
                        required
                        v-model="user.password" 
                        name="password" />
                    </div>
                    <div class="form-group">
                        <label>Confirm your password</label>
                        <input class="form-control" 
                        id="confirm_password" 
                        placeholder="******" 
                        type="password" 
                        required
                        v-model="user.confirm_password" 
                        name="confirm_password" />
                    </div>
                    <div class="form-group">
                        <div class="checkbox">
                            <label> <input type="checkbox"> Save password </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <button @click="registerUser" class="btn btn-primary btn-block"> registrarse </button>
                    </div>
                </form>
            </article>
        </div>


</template>
  
<script>
import UserService from '../services/user.service';

export default {
    name: "user-register",
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
  