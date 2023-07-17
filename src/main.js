import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import setupInterceptors from './services/setupInterceptors';
Vue.config.productionTip = false

import vuetify from './plugins/vuetify'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast);
Vue.use(VueSweetalert2);
setupInterceptors(store);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')





