/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import Vue from 'vue';

export default {
    SET_USER(state, user) {
        Vue.set(state, 'userProfile', user);
    },

    LOGOUT(state) {
        Vue.set(state, 'userProfile', '');
    },

    REMOVE_RECORD(state, itemId) {
        const userIndex = state.users.findIndex((u) => u.id === itemId);
        state.users.splice(userIndex, 1);
    }
};
