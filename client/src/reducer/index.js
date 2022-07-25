import {
  CREATE_RECIPE,
  SET_RECIPE,
  SET_RECIPES,
  SET_RECIPES_NAME,
} from "../actions";

let id = 1;

const initialState = {
  recipes: [],
  detailRecipe: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, { ...action.payload, id: id++ }],
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

    default:
      return { ...state };
  }
}
