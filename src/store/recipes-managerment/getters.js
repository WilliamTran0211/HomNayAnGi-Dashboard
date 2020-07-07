export default {
    getRecipeInfo: (state) => (id) => {
        return state.recipesList.find((recipe) => recipe.id == id);
    }
};