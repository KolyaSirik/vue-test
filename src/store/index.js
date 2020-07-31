import Vue from 'vue';
import Vuex from 'vuex';

// eslint-disable-next-line import/extensions
import modulePosts from './modules/posts/index.js';
// eslint-disable-next-line import/extensions
import moduleAuth from './modules/auth/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts: modulePosts,
    auth: moduleAuth,
  },
});
