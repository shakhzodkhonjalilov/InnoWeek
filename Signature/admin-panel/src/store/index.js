import Vue from 'vue';
import Vuex from 'vuex';
import list from './modules/list';
import agreement from './modules/agreement';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { user: { token: localStorage.getItem('token') || '' } },
  mutations: {
    setToken(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ state, commit }, { login, password }) {
      try {
        const { data } = await axios.post(
          'admin',
          { login, password },
          {
            headers: { Authorization: `Basic ${state.user.token}` },
          }
        );
        localStorage.setItem('token', data.token);
        commit('setToken', data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location = '/operator-panel/auth';
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
    async removeToken({ commit }) {
      localStorage.removeItem('token');
      commit('setToken', '');
    },
  },
  getters: {
    loggedIn: s => !!s.user.token,
    user: s => s.user,
  },
  modules: {
    list,
    agreement,
  },
});
