<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">
            Sign in
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="loginUser">
              <v-text-field
                v-model="user.email"
                label="Your email"
                type="email"
                :rules="[v => !!v || 'Email is required', v => /.+@.+/.test(v) || 'Email must be valid']"
                required
              ></v-text-field>
              <v-text-field
                :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showpass = !showpass"
                v-model="user.password"
                label="Your password"
                :type="showpass ? 'text' : 'password'"
                :rules="[v => !!v || 'Password is required']"
                required
              ></v-text-field>
              <v-checkbox
                v-model="user.checked"
                label="Save password"
              ></v-checkbox>
              <v-btn
                type="submit"
                :disabled="loading"
                color="primary"
                block
              >
                {{ loading ? 'Logging in...' : 'Login' }}
              </v-btn>
              <v-alert class="mt-4"
                v-if="message"
                type="error"
                dismissible
                @input="message = ''"
              >
                <strong>Error!</strong> {{ message }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from '../models/user';
export default {
    name: "UserLogin",
    data() {
        return {
            showpass: false,
            user: new User(),
            loading: false,
            message: '',
        };
    },
    methods: {
        loginUser() {
        this.message = "";
        if (this.$refs.form.validate()) {
                this.loading=true;
                this.$store.dispatch('auth/login', this.user).then(
                    () => {
                    this.$router.push("profile");
                    },
                    error => {
                    this.loading = false;
                    this.message = (error.response && error.response.data.mensaje) || error.message;
                    }
                );
        } else {
        this.$toast.error("Complete todos los datos requeridos", {timeout: 1000});}
        },
        newuser() {
            this.user = {};
        }
    }
};
</script>

<style></style>
