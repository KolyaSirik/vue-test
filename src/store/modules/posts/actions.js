// eslint-disable-next-line import/extensions
import axios from '@/api/index.js';

export default {
  async loadPosts({ commit }, params) {
    await axios.get('/posts', { params })
      .then((response) => {
        commit('SET_POSTS', response.data);
      });
  },
  async loadPost({ commit }, postId) {
    await axios.get(`/post/${postId}`)
      .then((response) => {
        commit('SET_POST', response.data);
      });
  },
};
