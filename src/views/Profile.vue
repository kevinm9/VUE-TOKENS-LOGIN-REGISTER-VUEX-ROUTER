<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>User Profile</h2>

        <v-card v-if="user">
          <v-card-title>
            <h3>Welcome!, {{ user.name | toUpperCase }}</h3>
          </v-card-title>
          <v-card-text>
            <p> {{ user }}</p>
          </v-card-text>
        </v-card>

        <v-card v-if="data">
          <v-card-title>
            <h3>User Data Api Rest</h3>
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
    user() {
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
      return value ? value.split(' ').slice(0, 2).join(' ').toUpperCase(): '';
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
