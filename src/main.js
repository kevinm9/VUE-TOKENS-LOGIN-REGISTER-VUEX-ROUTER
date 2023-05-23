import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import setupInterceptors from './services/setupInterceptors';
Vue.config.productionTip = false
setupInterceptors(store);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')





