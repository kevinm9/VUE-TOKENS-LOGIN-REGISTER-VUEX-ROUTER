<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="display-2">Bienvenido al Desarrollo con Vue y Vuetify</h1>
        <p class="subtitle-1">
          Descubre cómo construir aplicaciones hermosas y eficientes con la combinación de Vue.js y Vuetify.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h2 class="headline">Vue.js</h2>
        <p>
          Vue.js es un framework progresivo para la construcción de interfaces de usuario. Es fácil de integrar en proyectos existentes y permite construir aplicaciones de una sola página de manera eficiente.
        </p>
      </v-col>
      <v-col>
        <h2 class="headline">Vuetify</h2>
        <p>
          Vuetify es un framework de componentes para Vue.js que sigue los principios de Material Design. Proporciona una amplia variedad de componentes listos para usar que facilitan la creación de interfaces modernas y atractivas.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h2 class="headline">Características</h2>
        <ul>
          <li>Desarrollo rápido y eficiente con Vue.js</li>
          <li>Interfaz de usuario atractiva con los componentes de Vuetify</li>
          <li>Integración sencilla de herramientas y librerías externas</li>
          <li>Documentación completa y comunidad activa</li>
        </ul>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h2 class="headline">Empezar</h2>
        <p>
          ¡Comienza tu viaje de desarrollo con Vue y Vuetify hoy mismo! Sigue la documentación oficial de Vue.js y Vuetify para obtener más información y ejemplos.
        </p>
        <v-btn color="primary" href="https://vuejs.org/" target="_blank">Vue.js</v-btn>
        <v-btn color="primary" href="https://vuetifyjs.com/" target="_blank">Vuetify</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserHome",
};
</script>

<style scoped>
/* Puedes agregar estilos específicos para este componente aquí */
</style>
