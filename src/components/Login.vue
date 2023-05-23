<template>

        <div class="card">
            <article class="card-body">
                <!-- <router-link to="/register" class="float-right btn btn-outline-primary">register</router-link> -->
                <h4 class="card-title mb-4 mt-1">Sign in</h4>
                <form @submit.prevent="loginUser">
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
                        <!-- <a class="float-right" href="#">Forgot?</a> -->
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
                        <div class="checkbox">
                            <label><input type="checkbox" id="checkbox" v-model="user.checked"> Save password</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" :disabled="loading" class="btn btn-primary btn-block"> Login </button>
                    </div> 
                    <div class="form-group">
                        <div v-if="message" class="alert alert-danger">
                            <strong>Error!</strong> {{message}}.
                            <button type="button" class="close" @click="message=!message" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                    </div>
                </form>
            </article>
        </div>

</template>

<script>
import User from '../models/user';
export default {
    name: "user-login",
    data() {
        return {
            user: new User(),
            loading: false,
            message: ''
        };
    },
    methods: {
        loginUser() {
        this.message = "";
        if (this.user.email != "" && this.user.password != "") {
                this.loading=true;
                this.$store.dispatch('auth/login', this.user).then(
                    () => {
                    location.reload();
                    },
                    error => {
                    this.loading = false;
                    this.message = (error.response && error.response.data.message) || error.message;
                    }
                );
        }
        },
        newuser() {
            this.user = {};
        }
    }
};
</script>

<style></style>
