import {
  CREATE_RECIPE,
  FILTER_DIET,
  SET_RECIPE,
  SET_RECIPES,
  SET_RECIPES_NAME,
} from "../actions";

const initialState = {
  recipesAPI: [],
  recipesBD: [],
  detailRecipe: {},
  results: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };

    case SET_RECIPES_NAME:
      const filterApi = state.recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(action.title.toLowerCase());
      });

      return {
        ...state,
        results: [...filterApi, ...action.payload],
      };

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, { ...action.payload }],
      };

    case SET_RECIPE:
      return {
        ...state,
        detailRecipe: action.payload,
      };

    case FILTER_DIET:
      return {
        ...state,
        recipes: action.payload,
      };

    default:
      return { ...state };
  }
}
