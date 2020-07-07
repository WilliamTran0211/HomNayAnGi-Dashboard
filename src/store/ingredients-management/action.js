/* eslint-disable */

import axios from '@/axios.js';

const PART_URL = 'api/recipies';

export default {
    fetchIngredients({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/recipies/ingredients/`)
                .then((response) => {
                    resolve(response);

                    commit('SET_INGREDIENTS_LIST', response.data);
                })
                .catch((error) => {
                    reject(error.response);
                });
        });
    },
    fetchIngredient({ commit }, ingredientsId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${PART_URL}/ingredients/${ingredientsId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error.response);
                });
        });
    },
    addIngredients({ commit }, { name, possible_unit }) {
        let bodyFormData = new FormData();
        bodyFormData.set('name', name);
        bodyFormData.set('possible_units', possible_unit.toString());
        return new Promise((resolve, reject) => {
            axios
                .post(`${PART_URL}/ingredients/create`, bodyFormData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error.response);
                });
        });
    },
    editIngredients({ commit }, { id, name, possible_unit }) {
        let bodyFormData = new FormData();
        bodyFormData.set('name', name);
        bodyFormData.set('possible_unit', possible_unit.toString());
        return new Promise((resolve, reject) => {
            axios
                .put(`${PART_URL}/ingredients/${id}`, bodyFormData)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error.response);
                });
        });
    }
};
