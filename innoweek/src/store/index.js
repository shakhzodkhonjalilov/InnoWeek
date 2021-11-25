import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curLang: localStorage.getItem("language") || "ru"
  },
  mutations: {
    setLang(state, val) {
      state.curLang = val;
    }
  },
  actions: {},
  modules: {}
});
