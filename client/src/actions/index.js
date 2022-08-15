export const SET_RECIPES = "SET_RECIPES",
  SET_DEFAULT_RECIPES = "SET_DEFAULT_RECIPES",
  SET_RECIPES_NAME = "SET_RECIPES_NAME",
  FILTER_DIET = "FILTER_DIET",
  SET_OTHER_FILTER = "SET_OTHER_FILTER",
  SET_RECIPE = "SET_RECIPE",
  CREATE_RECIPE = "CREATE_RECIPE",
  CLEAR_MSG = "CLEAR_MSG",
  SET_DIETS = "SET_DIETS";

export function getRecipes() {
  return function (dispatch) {
    return fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((recipes) => dispatch({ type: SET_RECIPES, payload: recipes }));
  };
}

export function defaultRecepes() {
  return { type: SET_DEFAULT_RECIPES };
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

export function filterDiet(diet) {
  return { type: FILTER_DIET, payload: diet };
}

export function othersFilters(recipes) {
  return { type: SET_OTHER_FILTER, payload: recipes };
}

export function getRecipe(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((recipe) => dispatch({ type: SET_RECIPE, payload: recipe }));
  };
}

export function createRecipe(recipe) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes`, {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((recipe) => dispatch({ type: CREATE_RECIPE, payload: recipe }));
  };
}

export function clearMSG() {
  return { type: CLEAR_MSG };
}

export function getDiets() {
  return function (dispatch) {
    return fetch("http://localhost:3001/diets/")
      .then((response) => response.json())
      .then((diets) => dispatch({ type: SET_DIETS, payload: diets }));
  };
}
