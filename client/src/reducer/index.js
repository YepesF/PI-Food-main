import {
  CREATE_RECIPE,
  FILTER_DIET,
  SET_RECIPE,
  SET_RECIPES,
  SET_RECIPES_NAME,
  ALL_RECIPES,
  SET_DEFAULT_RECIPES,
  SET_OTHER_FILTER,
} from "../actions";

const initialState = {
  recipes: [],
  detailRecipe: {},
  results: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        results: [...action.payload],
      };

    case SET_DEFAULT_RECIPES:
      return {
        ...state,
        results: [...state.recipes],
      };

    case SET_RECIPES_NAME:
      return {
        ...state,
        results: action.payload,
      };

    case FILTER_DIET:
      const results = state.recipes.filter((recipe) => {
        return recipe.diets.includes(action.payload) && recipe;
      });
      return {
        ...state,
        results: [...results],
      };

    case SET_OTHER_FILTER:
      return {
        ...state,
        results: [...action.payload],
      };

    // case CREATE_RECIPE:
    //   return {
    //     ...state,
    //     recipes: [...state.recipes, { ...action.payload }],
    //   };

    // case SET_RECIPE:
    //   return {
    //     ...state,
    //     detailRecipe: action.payload,
    //   };

    default:
      return { ...state };
  }
}
