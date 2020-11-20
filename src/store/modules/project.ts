import { GetterTree, MutationTree, ActionTree } from 'vuex';
import api from '@/services/api';
import * as Project from '@/models/project.model';
import * as File from '@/models/file.model';
import * as ProjectSerializer from '@/serializers/project.serializer';
import * as FileSerializer from '@/serializers/file.serializer';
import { InitialFrontState } from '../states/project.state';

class State {
  currentProject: Project.Front = InitialFrontState;
  projectList: Array<Project.Front> = [];
  projectFilesList: Array<File.Front> = [];
}

const mutations = {
  SET_PROJECT(state, item) {
    Object.assign(state.currentProject, item);
  },

  SET_PROJECTS(state, items) {
    state.projectList = items;
  },

  SET_FILE_LIST(state, items) {
    state.projectFilesList = items;
  },
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

      commit('SET_PROJECTS', data);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },

  async create ({ commit }, project) {
    try {
      const data = ProjectSerializer.serialize(project);

      const response = await api.post(`/projects`, data, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      return response;
    } catch(error) {
      throw error.response.data;
    }
  },

  async show ({ commit }, projectId) {
    try {
      const response = await api.get<Project.ApiResponse>(`/projects/${projectId}`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      const project = ProjectSerializer.deserialize(response.data);

      commit('SET_PROJECT', project);
      return project;
    } catch(error) {
      throw error.response.data;
    }
  },

  async getFileList ({ commit }, projectId) {
    try {
      const data: Array<File.Front> = [];
      const response = await api.get<File.ApiResponse[]>(`/projects/${projectId}/all-files`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      response.data.forEach((element: File.ApiResponse) => {
        data.push(FileSerializer.deserialize(element));
      });

      commit('SET_FILE_LIST', data);
      return data;
    } catch(error) {
      throw error.response.data;
    }
  }
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
