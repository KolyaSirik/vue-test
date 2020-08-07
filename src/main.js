import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// eslint-disable-next-line import/extensions
import router from './routes/index.js';
// eslint-disable-next-line import/extensions
import store from './store/index.js';
// eslint-disable-next-line import/extensions
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// eslint-disable-next-line import/order
import { extend } from 'vee-validate';
// eslint-disable-next-line import/order
import * as rules from 'vee-validate/dist/rules';

// eslint-disable-next-line import/order
import { messages } from 'vee-validate/dist/locale/en.json';

import wb from './registerServiceWorker';

Vue.prototype.$workbox = wb;

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  store,
  router,
  ...App,
}).$mount('#app');
