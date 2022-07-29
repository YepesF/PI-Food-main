import {
  CREATE_RECIPE,
  FILTER_DIET,
  SET_RECIPE,
  SET_RECIPES,
  SET_RECIPES_NAME,
} from "../actions";

const initialState = {
  recipes: [],
  detailRecipe: {},
  filters: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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

    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };

    case SET_RECIPES_NAME:
      return {
        ...state,
        recipes: action.payload,
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
