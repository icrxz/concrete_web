import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';

import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import router from './router/routes';
import store from './store';
import axios from './plugins/axios';
import vuetify from './plugins/vuetify';


const app = express();

app.use(serveStatic(path.join(__dirname, '/dist')));
const port = process.env.PORT || 8080;

app.listen(port);
console.log(`app is listening on port: ${port}`);


Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueTheMask);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
