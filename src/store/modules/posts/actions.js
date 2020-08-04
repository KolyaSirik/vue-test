// eslint-disable-next-line import/extensions
import axios from '@/api/index.js';
// eslint-disable-next-line no-unused-vars
import * as types from '../../mutation-types';

export default {
  async loadPosts({ commit }, params) {
    await axios.get('/posts', { params })
      .then((response) => {
        commit(types.SET_POSTS, response.data);
      });
  },
  async loadPost({ commit }, postId) {
    await axios.get(`/post/${postId}`)
      .then((response) => {
        commit(types.SET_POST, response.data);
      });
  },
};
