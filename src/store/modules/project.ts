import { GetterTree, MutationTree, ActionTree } from 'vuex';
import api from '@/services/api';
import * as Project from '@/models/project.model';
import * as ProjectSerializer from '@/serializers/project.serializer';
import FrontState from '../states/project.state';

class State {
  currentProject: Project.Front = FrontState;
  projectList: Array<Project.Front> = [];
}

const mutations = {
  SET_PROJECT(state, item) {
    state.currentProject = Object.assign(state.currentProject, item);
  },

  SET_PROJECTS(state, items) {
    state.projectList = items;
  }
} as MutationTree<State>;

const actions = {
  async index({ commit }) {
    try {
      const data: Array<Project.Front> = [];
      const response = await api.get(`/projects`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      response.data.forEach((element: any) => {
        data.push(ProjectSerializer.deserialize(element));
      });

      console.log(response);
      console.log(data);

      commit('SET_PROJECTS', data);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },
} as ActionTree<State, unknown>;

const getters = {
  project: (state) => state.currentProject,
  projects: (state) => state.projectList,
} as GetterTree<State, unknown>;

export default {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
};
