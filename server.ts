import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';

import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from '.src/App.vue';
import router from '.src/router/routes';
import store from '.src/store';
import axios from '.src/plugins/axios';
import vuetify from '.src/plugins/vuetify';


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
