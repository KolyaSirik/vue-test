// eslint-disable-next-line import/extensions
import state from './state.js';
// eslint-disable-next-line import/extensions
import mutations from './mutations.js';
// eslint-disable-next-line import/extensions
import actions from './actions.js';
// eslint-disable-next-line import/extensions
import getters from './getters.js';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
