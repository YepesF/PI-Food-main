export const CREATE_RECIPE = "CREATE_RECIPE";

export function createRecipe(recipe) {
  return {
    type: CREATE_RECIPE,
    payload: recipe,
  };
}
