import axios from 'axios';

const state = () => ({
  agreement: {},
});

const getters = {};

const mutations = {
  setAgreement(state, agreement) {
    state.agreement = agreement;
  },
  removeAgreement(state) {
    state.agreement = {};
    state.info = [];
  },
};

const actions = {
  async getAgreement({ commit }, id) {
    try {
      const data = await axios.get(`document/${id}`);
      const agreement = await data.data[0];
      commit('setAgreement', agreement);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        commit('setToken', '', { root: true });
        window.location = '/operator-panel/auth';
      }
      throw new Error(error);
    }
  },
  async createAgreement({ rootState, commit }, newAgreement) {
    try {
      await axios.post(`document/create`, newAgreement, {
        headers: {
          Authorization: `Basic ${rootState.user.token}`,
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        commit('setToken', '', { root: true });
        window.location = '/operator-panel/auth';
      }
      throw new Error(error);
    }
  },
  async editAgreement({ rootState, commit }, editAgreement) {
    try {
      await axios.post(`document/update`, editAgreement, {
        headers: {
          Authorization: `Basic ${rootState.user.token}`,
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        commit('setToken', '', { root: true });
        window.location = '/operator-panel/auth';
      }
      throw new Error(error);
    }
  },
  async rmAgreement({ rootState, commit }, agreement) {
    try {
      await axios.post(
        `document/remove`,
        { link: agreement },
        {
          headers: {
            Authorization: `Basic ${rootState.user.token}`,
          },
        }
      );
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
