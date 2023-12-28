<template>
<div>

    <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon v-if="loggedIn" @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>SPA VUE</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn-toggle group>
            <v-btn v-if="!loggedIn" to="/login">
                <v-icon left>
                    mdi-account-key
                </v-icon>
                Login
            </v-btn>
            <v-btn v-if="loggedIn" to="/logout">
                <v-icon left>
                    mdi-exit-to-app
                </v-icon>
                salir
            </v-btn>
            <v-btn v-if="!loggedIn" to="/register">
                <v-icon left>
                    mdi-account-plus
                </v-icon>
                Registro
            </v-btn>
        </v-btn-toggle>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
            <v-list-item-group active-class="primary--text text--accent-4">
                <v-list-item to="/" link>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item to="/profile" link>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>

                <v-list-item to="/formasdepagos" link>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>formasdepagos</v-list-item-title>
                </v-list-item>

                <v-list-item to="/productos" link>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>productos</v-list-item-title>
                </v-list-item>

                <v-list-item to="/categorias" link>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>categorias</v-list-item-title>
                </v-list-item>

            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

</div>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            drawer: false
        };
    },
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
