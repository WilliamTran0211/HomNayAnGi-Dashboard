/*=========================================================================================
  File Name: moduleCalendarGetters.js
  Description: Calendar Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
    user: (state) => state.userProfile,
    // isAuthenticated: state => !!JSON.stringify(state.userProfile)
    countUsers: (state) => {
        return state.users.usersList.lenght;
    }
};
