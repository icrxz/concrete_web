import { GetterTree, MutationTree, ActionTree } from 'vuex';
import api from '@/services/api';
import * as User from '@/models/user.model';
import * as UserSerializer from '@/serializers/user.serializer';
import FrontState from '../states/user.state';

class State {
  currentUser: User.Front = FrontState;
}

const mutations = {
  SET_USER(state, item) {
    state.currentUser = Object.assign(state.currentUser, item);
  },
} as MutationTree<State>;

const actions = {
  async create({ commit }, data: User.Front) {
    try {
      const serialized = UserSerializer.serialize(data);

      const response = await api.post(`/users`, serialized);

      return response;
    } catch (error) {
      throw error.response.data;
    }
  },

  async show ({ commit }, userId) {
    try {
      const response = await api.get<User.ApiResponse>(`/users/${userId}`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      const user = UserSerializer.deserialize(response.data);

      commit('SET_USER', user);
      return user;
    } catch(error) {
      throw error.response.data;
    }
  },
} as ActionTree<State, unknown>;

const getters = {
  user: (state) => state.currentUser,
} as GetterTree<State, unknown>;

export default {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
};
