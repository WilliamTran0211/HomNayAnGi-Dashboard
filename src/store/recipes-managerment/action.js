/* eslint-disable */
import axios from '@/axios.js';

const PART_URL = 'api/recipies';

export default {
    fetchRecipes({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/recipies/`)
                .then((response) => {
                    resolve(response);

                    commit('SET_RECIPES_LIST');
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    fetchRecipe({ commit }, recipesId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${PART_URL}/${recipesId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    fetchRecipeImages({ commit }, recipesId) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${PART_URL}/${recipesId}/get-images`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    addRecipes({ commit }, { title, dish_types, servings, readyInMinutes, summary, inductions }) {
        let bodyFormData = new FormData();
        bodyFormData.set('title', title);
        bodyFormData.set('dish_types', dish_types);
        bodyFormData.set('servings', servings);
        bodyFormData.set('readyInMinutes', readyInMinutes);
        bodyFormData.set('summary', summary);
        bodyFormData.set('inductions', inductions);
        return new Promise((resolve, reject) => {
            axios
                .post(`${PART_URL}/create`, bodyFormData, {
                    headers: {
                        'Content-Type': 'application/json'
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
    editRecipes({ commit }, { id, title, dish_types, servings, readyInMinutes, summary, inductions }) {
        let bodyFormData = new FormData();
        bodyFormData.set('title', title);
        bodyFormData.set('dish_types', dish_types);
        bodyFormData.set('servings', parseInt(servings));
        bodyFormData.set('readyInMinutes', parseInt(readyInMinutes));
        bodyFormData.set('summary', summary);
        bodyFormData.set('inductions', JSON.stringify(inductions));
        return new Promise((resolve, reject) => {
            axios
                .put(`${PART_URL}/${id}`, bodyFormData, {
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

    fetchRecipesIngredients({ commit }, recipe) {
        if (recipe == undefined) recipe = ' ';
        return new Promise((resolve, reject) => {
            axios
                .get(`${PART_URL}/recipes-ingredients?recipe=` + recipe)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    uploadRecipesIngredients({ commit }, obj = { amount, unit, recipe, ingredient }) {
        let bodyformData = new FormData();
        bodyFormData.set('recipe_ingredients', JSON.stringify(obj));
        return new Promise((resolve, reject) => {
            axios
                .get(`${PART_URL}/recipes-ingredients?recipe=${recipe}&pk=${id}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    EditRecipesIngredients({ commit }, { id, amount, unit, recipe, ingredient }) {
        let bodyFormData = new FormData();
        bodyFormData.set('id', id);
        bodyFormData.set('amount', parseFloat(amount));
        bodyFormData.set('unit', unit);

        return new Promise((resolve, reject) => {
            axios
                .put(`${PART_URL}/recipes-ingredients/${id}/edit`, bodyFormData, {
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
    }
};
