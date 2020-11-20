import { GetterTree, MutationTree, ActionTree } from 'vuex';
import api from '@/services/api';
import * as Organization from '@/models/organization.model';
import * as OrganizationSerializer from '@/serializers/organization.serializer';
import { InitialFrontState } from '../states/organization.state';

class State {
  currentOrganization: Organization.Front = InitialFrontState;
  organizationList: Array<Organization.Front> = [];
}

const mutations = {
  SET_ORGANIZATION(state, item) {
    Object.assign(state.currentOrganization, item);
  },

  SET_ORGANIZATIONS(state, items) {
    state.organizationList = items;
  }
} as MutationTree<State>;

const actions = {
  async index({ commit }) {
    try {
      const data: Array<Organization.Front> = [];
      const response = await api.get(`/organizations`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      response.data.forEach((element: any) => {
        data.push(OrganizationSerializer.deserialize(element));
      });

      commit('SET_ORGANIZATIONS', data);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },

  async create ({ commit }, organization) {
    try {
      const data = OrganizationSerializer.serialize(organization);

      const response = await api.post(`/organizations`, data, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      return response;
    } catch(error) {
      throw error.response.data;
    }
  },

  async show ({ commit }, organizationId) {
    try {
      const response = await api.get<Organization.ApiResponse>(`/organizations/${organizationId}`, {
        headers: {
          auth: localStorage.jwt,
        }
      });

      const organization = OrganizationSerializer.deserialize(response.data);

      commit('SET_ORGANIZATION', organization);
      return organization;
    } catch(error) {
      throw error.response.data;
    }
  },
} as ActionTree<State, unknown>;

const getters = {
  organization: (state) => state.currentOrganization,
  organizations: (state) => state.organizationList,
} as GetterTree<State, unknown>;

export default {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
};
