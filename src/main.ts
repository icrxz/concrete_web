import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import router from './router/routes';
import store from './store';
import axios from './plugins/axios';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueTheMask);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
