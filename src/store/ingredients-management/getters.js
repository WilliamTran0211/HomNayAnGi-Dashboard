export default {
    getIngredientInfo: (state) => (id) => {
        return state.ingredientsList.find((ingredient) => ingredient.id == id);
    }
};
