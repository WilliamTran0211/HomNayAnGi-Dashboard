import Vue from 'vue';

export default {
    SET_INGREDIENTS_LIST(state, list) {
        Vue.set(state, 'ingredients', list);
    },
    ADD_INGREDIENTS(state, { id, name, possible_unit }) {
        state.ingredients.push({
            id: id,
            name: name,
            possible_unit: possible_unit
        });
    }
};
