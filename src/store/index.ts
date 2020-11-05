import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication';
import users from './modules/user';
import projects from './modules/project';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    projects,
    users,
  },
});
