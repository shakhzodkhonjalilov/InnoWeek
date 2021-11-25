import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import Notifications from 'vue-notification';
import '@/assets/main.scss';

Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  render: h => h(App),
}).$mount('#app');
