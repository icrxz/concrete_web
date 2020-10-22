import { GetterTree, MutationTree, ActionTree } from 'vuex';
import api from '@/services/api';

class State {
  currentUser: object = {};
  fetchAccount: object = {};
}

const mutations = {
  SET_LOGIN(state, item) {
    state.currentUser = item;
  },
  SET_USER(state, item) {
    state.fetchAccount = Object.assign(state.fetchAccount, item);
  },
} as MutationTree<State>;

const actions = {
  async login({ commit }, data) {
    try {
      const response = await api.post(`/login`, data);

      commit('SET_LOGIN', {});
      localStorage.setItem('Authenticated', 'true');
      localStorage.setItem('jwt', response.data.token);

      return response;
    } catch (error) {
      localStorage.setItem('Authenticated', 'false');
      localStorage.setItem('jwt', '');

      throw error.response.data;
    }
  },
} as ActionTree<State, unknown>;

const getters = {
  account: (state) => state.fetchAccount,
} as GetterTree<State, unknown>;

export default {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
};
