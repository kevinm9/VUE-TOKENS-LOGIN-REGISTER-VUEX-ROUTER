<template>
    <div class="submit-form">
        <div class="form-group">
            <label for="name">name</label>
            <input type="text" class="form-control" id="name" required v-model="user.name" name="name" />
        </div>

        <div class="form-group">
            <label for="email">email</label>
            <input class="form-control" id="email" required v-model="user.email" name="email" />
        </div>

        <div class="form-group">
            <label for="password">password</label>
            <input class="form-control" id="password" required v-model="user.password" name="password" />
        </div>

        <button @click="registerUser" class="btn btn-success">Submit</button>



    </div>
</template>
  
<script>
import UserDataService from "../services/UserDataService";

export default {
    name: "user-register",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
            },
            submitted: false
        };
    },
    methods: {
        registerUser() {
            let data = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                confirm_password: this.user.password
            };

            UserDataService.register(data)
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
  