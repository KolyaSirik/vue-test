// eslint-disable-next-line import/extensions
import axios from '@/api/index.js';
// eslint-disable-next-line no-unused-vars
import * as types from '../../mutation-types';

export default {
  async register({ commit }, data) {
    await axios.post('/auth', data)
      .then((response) => {
        if (response.data.success) {
          commit(types.SET_USER, response.data.user);
        }
      }).catch((error) => {
        commit(types.SET_ERRORS, error.response.data.errors);
      });
  },
  logout({ commit }) {
    commit(types.REMOVE_USER);
  },
};
