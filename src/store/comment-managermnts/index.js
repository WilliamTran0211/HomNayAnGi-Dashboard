import state from './state.js';
import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';

export default {
    isRegistered: false,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
