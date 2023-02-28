import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS
  } from "../../utils/constants";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: null
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { 
        ...state, 
        ingredients: action.ingredients, 
        ingredientsRequest: false 
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { 
        ...state, 
        ingredientsFailed: true, 
        ingredientsRequest: false 
      };
    }
    default: {
      return state
    }
  }
} 
