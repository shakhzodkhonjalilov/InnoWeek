import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

// axios.defaults.baseURL = "https://operator.innoweek.uz/api";
axios.defaults.baseURL = 'http://localhost:8085/api';

new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App),
}).$mount('#app');
