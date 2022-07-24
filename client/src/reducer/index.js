import { CREATE_RECIPE } from "../actions";

let id = 1;

const initialState = {
  recipes: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, { ...action.payload, id: id++ }],
      };
    default:
      return { ...state };
  }
}
