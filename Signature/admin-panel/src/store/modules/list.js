import axios from 'axios';

const state = () => ({
  agreements: [],
  search: '',
});

const getters = {
  agreementsLength: s => s.agreements.length,
};

const mutations = {
  setAgreements(state, agreements) {
    state.agreements = agreements;
  },
  setSearch(state, val) {
    state.search = val.trim();
  },
  addAgreements(state, user) {
    state.agreements.push(user);
  },
};

const actions = {
  async getAgreements({ commit, rootState }) {
    try {
      const res = await axios.get(`documents`, {
        headers: {
          Authorization: `Basic ${rootState.user.token}`,
        },
      });
      const data = await res.data;
      commit('setAgreements', data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        commit('setToken', '', { root: true });
        window.location = '/operator-panel/auth';
      }
      throw new Error(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
