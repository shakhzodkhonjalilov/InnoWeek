import Vue from "vue";
import Vuex from "vuex";

import Language from "@/static/innoWeek";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: "ru",
    data: {},
    user: {
      firstName: "",
      secondName: "",
      email: "",
      phone: "",
      position: "",
      country: "",
      city: "",
      company: "",
      mainActivity: "",
      website: "",
      standType: "",
      mainColor: "",
      optionalFile: "",
    },
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setUser(state, data) {
      state.user = { ...state.user, ...data };
    },
    changeLanguage(state, lang) {
      state.language = lang;
    },
  },
  actions: {
    getData({ commit }, cur) {
      const data = Language[cur];
      commit("setData", data);
    },
    setUser({ commit }, data) {
      commit("setUser", data);
    },
    changeLang({ commit, dispatch }, lang) {
      commit("changeLanguage", lang);
      dispatch("getData", lang);
    },
  },
  getters: {
    lang: (s) => s.language,
    user: (s) => s.user,
    topData: (s) => s.data.top,
    appForm: (s) => s.data.application.form,
    appStand: (s) => s.data.application.stand,
    appFile: (s) => s.data.application.file,
    appReq: (s) => s.data.application.data,
    countries: (s) => s.data.countries,
  },
  modules: {},
});
