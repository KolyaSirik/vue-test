import Vue from 'vue';
import Vuex from 'vuex';

// eslint-disable-next-line import/extensions
import posts from './modules/posts/index.js';
// eslint-disable-next-line import/extensions
import auth from './modules/auth/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    auth,
  },
});
