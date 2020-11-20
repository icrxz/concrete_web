import { GetterTree, MutationTree, ActionTree } from 'vuex';
import api from '@/services/api';
import * as File from '@/models/file.model';
import * as FileSerializer from '@/serializers/file.serializer';
import * as FileHistory from '@/models/fileHistory.model';
import * as FileHistorySerializer from '@/serializers/fileHistory.serializer';
import { InitialFrontState } from '../states/file.state';
import * as HistoryState from '../states/fileHistory.state';

class State {
  currentFile: File.Front = InitialFrontState;
  currentFileHistory: Array<FileHistory.Front> = [];
  fileHistoryActive: FileHistory.Front = HistoryState.InitialFrontState;
  fileList: Array<File.Front> = [];
}

const mutations = {
  SET_FILE(state, item) {
    Object.assign(state.currentFile, item);
  },

  SET_FILES(state, items) {
    state.fileList = items;
  },

  SET_FILE_ACTIVE(state, item) {
    Object.assign(state.fileHistoryActive, item);
  },

  SET_FILE_HISTORY(state, items) {
    state.currentFileHistory = items;
  },
} as MutationTree<State>;

const actions = {
  async index({ commit }) {
    try {
      const data: Array<File.Front> = [];
      const response = await api.get(`/files`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      response.data.forEach((element: any) => {
        data.push(FileSerializer.deserialize(element));
      });

      console.log(response);

      commit('SET_FILE', data);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },

  async change ({ commit }, file) {
    try {
      const data = FileSerializer.serialize(file);

      const response = await api.put(`/files/${file.id}`, data, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      return response;
    } catch(error) {
      throw error.response.data;
    }
  },

  async delete ({ commit }, fileId) {
    try {
      const response = await api.delete(`/files/${fileId}`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      console.log(response);

      return response;
    } catch(error) {
      throw error.response.data;
    }
  },

  async show ({ commit }, fileId) {
    try {
      const response = await api.get<File.ApiResponse>(`/files/${fileId}`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      const file = FileSerializer.deserialize(response.data);

      commit('SET_FILE', file);
      return file;
    } catch(error) {
      throw error.response.data;
    }
  },

  async getFileActive ({ commit }, fileId) {
    try {
      const response = await api.get<Array<FileHistory.ApiResponse>>(`/files/${fileId}/history-active`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      console.log(response);

      const fileActive = FileHistorySerializer.deserialize(response.data[0]);

      commit('SET_FILE_ACTIVE', fileActive);
      return fileActive;
    } catch(error) {
      throw error.response.data;
    }
  },

  async getFileHistory ({ commit }, fileId) {
    try {
      const data: Array<FileHistory.Front> = [];
      const response = await api.get<FileHistory.ApiResponse[]>(`/files/${fileId}/history`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      console.log(response);

      response.data.forEach((element) => {
        data.push(FileHistorySerializer.deserialize(element));
      });

      commit('SET_FILE_HISTORY', data);
      return data;
    } catch(error) {
      throw error.response.data;
    }
  }
} as ActionTree<State, unknown>;

const getters = {
  file: (state) => state.currentFile,
  files: (state) => state.fileList,
  activeHistory: (state) => state.fileHistoryActive,
  fileHistory: (state) => state.currentFileHistory,
} as GetterTree<State, unknown>;

export default {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
};
