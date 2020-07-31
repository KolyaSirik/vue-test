export default {
  SET_USER(state, user) {
    state.user = user;
    state.errors = null;
  },
  REMOVE_USER(state) {
    state.user = null;
  },
  SET_ERRORS(state, errors) {
    state.user = null;
    state.errors = errors;
  },
};
