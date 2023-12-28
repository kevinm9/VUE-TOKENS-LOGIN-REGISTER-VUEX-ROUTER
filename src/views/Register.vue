<template>
<v-container fluid>
    <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
            <v-card>
                <v-card-title class="headline">
                    Register
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" @submit.prevent="registerUser" v-model="formvalido">
                        <v-text-field v-model="user.name" label="Your Name" :rules="[v => !!v || 'Name is required']" required></v-text-field>
                        <v-text-field v-model="user.email" label="Your email" type="email" :rules="[v => !!v || 'Email is required',v => /.+@.+\..+/.test(v) || 'Email must be valid']" required></v-text-field>
                        <v-text-field v-model="user.password" label="Your password" type="password" :rules="[v => !!v || 'Password is required']" required></v-text-field>
                        <v-text-field v-model="user.confirm_password" label="Confirm your password" type="password" :rules="[v => !!v || 'Confirmation is required', v => v === user.password || 'Passwords must match']" required></v-text-field>
                        <v-checkbox v-model="user.savePassword" label="Save password"></v-checkbox>
                        <v-btn type="submit" :disabled="!formvalido" :loading="loading"  block color="primary">
                            {{ loading ? 'Registrando...' : 'Registrar' }}
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    name: "UserRegister",
    data() {
        return {
            loading: false,
            formvalido: false,
            user: {
                name: "",
                email: "",
                password: "",
                confirm_password: ""
            }
        };
    },
    methods: {
        registerUser() {
            if (!this.$refs.form.validate()) {
                this.$toast.error("Complete todos los datos requeridos", {
                    timeout: 1000
                });
                return
            }
            this.loading = true;
            this.$store.dispatch('auth/register', this.user)
                .then((response) => {
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        background: '#a5dc86',
                        iconColor: 'white',
                        color: 'white',
                        timerProgressBar: true,
                        timer: 3000,
                        icon: 'success',
                        text: 'Guardado!'
                    });
                    this.newuser();
                    this.loading = false;
                })
                .catch(e => {
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        background: '#f27474',
                        iconColor: 'white',
                        color: 'white',
                        timerProgressBar: true,
                        timer: 3000,
                        icon: 'error',
                        text: 'Error!'+e.response.data?.errores?.email
                    });
                    alert(e.response.data.errores.email);
                    this.loading = false;
                });
        },
        newuser() {
            this.user = {};
            this.$refs.form.reset();
        }
    }
};
</script>
