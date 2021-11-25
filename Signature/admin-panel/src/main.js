import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/main.scss";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
