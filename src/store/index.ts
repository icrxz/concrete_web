import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication';
import files from './modules/file';
import organizations from './modules/organization';
import projects from './modules/project';
import users from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    files,
    organizations,
    projects,
    users,
  },
});
