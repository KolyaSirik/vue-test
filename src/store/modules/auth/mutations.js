// eslint-disable-next-line no-unused-vars
import * as types from '../../mutation-types';

export default {
  [types.SET_USER](state, user) {
    state.user = user;
    state.errors = null;
  },
  [types.REMOVE_USER](state) {
    state.user = null;
  },
  [types.SET_ERRORS](state, errors) {
    state.user = null;
    state.errors = errors;
  },
};
