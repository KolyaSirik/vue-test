// eslint-disable-next-line no-unused-vars
import * as types from '../../mutation-types';

export default {
  [types.SET_POSTS](state, posts) {
    state.posts = posts.data;
    state.meta = posts.meta;
    state.authors = posts.authors;
  },
  [types.SET_POST](state, post) {
    state.post = post;
  },
};
