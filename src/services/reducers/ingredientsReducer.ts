import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS
  } from "../../utils/constants";
import type { TGetIngredientsActions } from '../actions/ingredients';
import { TIngredient } from '../../types/types';

type TIngredientsState = {
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
  ingredients: ReadonlyArray<TIngredient> | null
} 

export const initialState: TIngredientsState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: null
}

export const ingredientsReducer = (state = initialState, action: TGetIngredientsActions): TIngredientsState => {
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
