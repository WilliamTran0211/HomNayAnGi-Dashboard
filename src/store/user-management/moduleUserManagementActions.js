/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
/* eslint-disable */

import axios from '@/axios.js';
// import { resolve } from "core-js/fn/promise";

// function decodeBase64Image(dataString) {
//     let matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
//         response = {};

//     if (matches.length !== 3) {
//         return new Error('Invalid input string');
//     }

//     response.type = matches[1];
//     response.data = new Buffer(matches[2], 'base64');

//     return response;
// }

export default {
    loginUser({ commit }, { email, password }) {
        let bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('password', password);

        return new Promise((resolve, reject) => {
            axios
                .post('/api/users/login', bodyFormData)
                .then((response) => {
                    localStorage.setItem('user-info', JSON.stringify(response.data));
                    commit('SET_USER', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    localStorage.removeItem('user-info');
                    reject(error);
                });
        });
    },

    logout({ commit }) {
        return new Promise((resolve) => {
            commit('LOGOUT');
            localStorage.removeItem('user-info');
            resolve();
        });
    },

    changePassword({ commit }, { email, password, new_password }) {
        let bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('password', password);
        bodyFormData.set('new_password', new_password);

        return new Promise((resolve, reject) => {
            axios
                .put('/api/users/forgot-password', bodyFormData)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    localStorage.removeItem('user-info');
                    reject(error);
                });
        });
    },

    fetchUsers({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/users/')
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    fetchUser(context, userId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/users/${userId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    fetchUserAvatar(context, avatarName) {
        let bodyFormData = new FormData();
        bodyFormData.set('image_name', avatarName);

        return new Promise((resolve, reject) => {
            axios
                .post(`/api/users/get-img`, bodyFormData)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    addUser({ commit }, { id, email, password, full_name, display_name, birthday, gender, avatar }) {
        let bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('full_name', full_name);
        bodyFormData.set('password', password);
        bodyFormData.set('display_name', display_name);
        bodyFormData.set('birthday', birthday);
        bodyFormData.set('gender', gender);
        bodyFormData.set('images', avatar);

        return new Promise((resolve, reject) => {
            axios
                .post(`/api/users/create`, bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    editUser({ commit }, { id, email, password, full_name, display_name, birthday, gender }) {
        const userId = id;

        let bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('full_name', full_name);
        bodyFormData.set('password', password);
        bodyFormData.set('display_name', display_name);
        bodyFormData.set('birthday', birthday);
        bodyFormData.set('gender', gender);

        return new Promise((resolve, reject) => {
            axios
                .put(`/api/users/${userId}`, bodyFormData)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    updateAvatar({ commit }, { id, avatar }) {
        const userId = id;
        let image = avatar;

        let bodyFormData = new FormData();
        bodyFormData.set('images', image);

        return new Promise((resolve, reject) => {
            axios
                .put(`/api/users/${userId}/update-avatar`, bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    removeRecord({ commit }, userId) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`/api/users/${userId}`)
                .then((response) => {
                    commit('REMOVE_RECORD', userId);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};
