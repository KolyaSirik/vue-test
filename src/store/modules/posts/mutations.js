export default {
  SET_POSTS(state, posts) {
    state.posts = posts.data;
    state.meta = posts.meta;
    state.authors = posts.authors;
  },
  SET_POST(state, post) {
    state.post = post;
  },
};
