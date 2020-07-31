// eslint-disable-next-line import/extensions
import axios from '@/api/index.js';

export default {
  async register({ commit }, data) {
    await axios.post('/auth', data)
      .then((response) => {
        if (response.data.success) {
          commit('SET_USER', response.data.user);
        }
      }).catch((error) => {
        commit('SET_ERRORS', error.response.data.errors);
      });
  },
  logout({ commit }) {
    commit('REMOVE_USER');
  },
};
