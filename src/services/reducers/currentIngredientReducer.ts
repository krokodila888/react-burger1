import {
  SET_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT
} from "../../utils/constants";
import type { TCurrentIngredientActions } from '../actions/currentIngredient';
import { TIngredient } from '../../types/types';

type TCurrentIngredientState = {
  currentItem: TIngredient | null,
  ingredientModalIsOpen: boolean
} 

const initialState: TCurrentIngredientState = {
  currentItem: null,
  ingredientModalIsOpen: false
}

export const currentIngredientReducer = (state = initialState, action: TCurrentIngredientActions): TCurrentIngredientState => {
  switch (action.type) {
    case SET_INGREDIENT:
      return {
        ...state,
        currentItem: {
          name: action.name, 
          image_large: action.image_large, 
          calories: action.calories, 
          carbohydrates: action.carbohydrates, 
          fat: action.fat, 
          proteins: action.proteins,
          image_mobile: action.image_mobile,
          image: action.image,
          price: action.price,
          type1: action.type,
          _id: action._id,
          __v: action.__v,
        },
        ingredientModalIsOpen: true
      }
    case CLEAR_CURRENT_INGREDIENT:
      return state
    default: {
      return state
    }
  }
} 
