<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>User Profile</h2>

        <v-card v-if="loggedIn">
          <v-card-title>
            <h3>Welcome!, {{ data.name | toUpperCase }}</h3>
          </v-card-title>
          <v-card-text>
            <p> {{ loggedIn }}</p>
          </v-card-text>
        </v-card>

        <v-card v-if="data">
          <v-card-title>
            <h3>User Data</h3>
          </v-card-title>
          <v-card-text>
            <p>Name: {{ data.name }}</p>
            <p>Age: {{ data.age }}</p>
            <!-- Añade más propiedades según la estructura de tu objeto de datos -->
          </v-card-text>
        </v-card>

        <v-card v-if="token">
          <v-card-title>
            <h3>Token Information</h3>
          </v-card-title>
          <v-card-text>
            <p>Bearer {{ token }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from '../services/auth.service';
export default {
  name: "UserProfile",
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
  },
  mounted() {
    this.registerUser();
  },
  filters: {
    toUpperCase(value) {
      const names = value.split(' '); // Suponiendo que los nombres están separados por espacio
      return value ? names.slice(0, 2).join(' ').toUpperCase(): '';
    }
  },
  methods: {
    registerUser() {
      AuthService.getUser(this.user)
        .then(response => {
          this.data = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
