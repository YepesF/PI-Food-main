export const CREATE_RECIPE = "CREATE_RECIPE",
  SET_RECIPES = "SET_RECIPES",
  SET_RECIPE = "SET_RECIPE",
  SET_RECIPES_NAME = "SET_RECIPES_NAME";

export function createRecipe(recipe) {
  return {
    type: CREATE_RECIPE,
    payload: recipe,
  };
}

export function getRecipe(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((recipe) => dispatch({ type: SET_RECIPE, payload: recipe }));
  };
}

export function getRecipes() {
  return function (dispatch) {
    return fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((recipes) => dispatch({ type: SET_RECIPES, payload: recipes }));
  };
}

export function getRecipesName(title) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes?name=${title}`)
      .then((response) => response.json())
      .then((recipes) =>
        dispatch({ type: SET_RECIPES_NAME, payload: recipes })
      );
  };
}
