import {
  SET_RECIPES,
  SET_DEFAULT_RECIPES,
  SET_RECIPES_NAME,
  FILTER_DIET,
  SET_OTHER_FILTER,
  SET_RECIPE,
  CREATE_RECIPE,
  CLEAR_MSG,
  SET_DIETS,
} from "../actions";

const initialState = {
  recipes: [],
  detailRecipe: {},
  results: [],
  filters: [],
  pagination: 1,
  indexPagination: { start: 0, end: 9 },
  msg: "",
  diets: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        results: [...action.payload],
        filters: [...action.payload],
      };

    case SET_DEFAULT_RECIPES:
      return {
        ...state,
        results: [...state.recipes],
        filters: [...state.recipes],
      };

    case SET_RECIPES_NAME:
      return {
        ...state,
        results: action.payload,
        filters: action.payload,
      };

    case FILTER_DIET:
      const results = [...state.filters].filter((recipe) => {
        return recipe.diets.includes(action.payload) && recipe;
      });
      return {
        ...state,
        results:
          results.length === 0
            ? {
                msg: `No puedimos encontrar ninguna receta que contenga la dieta ${action.payload}`,
              }
            : [...results],
      };

    case SET_OTHER_FILTER:
      return {
        ...state,
        results: [...action.payload],
      };

    case SET_RECIPE:
      return {
        ...state,
        detailRecipe: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state,
        msg: action.payload.msg,
      };

    case CLEAR_MSG:
      return {
        ...state,
        msg: "",
      };

    case SET_DIETS:
      return {
        ...state,
        diets: [...action.payload],
      };

    default:
      return { ...state };
  }
}
