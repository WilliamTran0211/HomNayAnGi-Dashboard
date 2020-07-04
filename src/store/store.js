import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import userManager from './user-management/moduleUserManagement';

import ingredientsManager from './ingredients-management/index';

import recipesManager from './recipes-managerment/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        userManager,
        ingredientsManager,
        recipesManager
    }
});

export default store;
