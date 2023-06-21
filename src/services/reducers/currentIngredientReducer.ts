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

export const initialState: TCurrentIngredientState = {
  currentItem: null,
  ingredientModalIsOpen: false
}

export const currentIngredientReducer = (state = initialState, action: TCurrentIngredientActions): TCurrentIngredientState => {
  switch (action.type) {
    case SET_INGREDIENT:
      return {
        ...state,
        currentItem: {
          name: action.currentItem.name, 
          image_large: action.currentItem.image_large, 
          calories: action.currentItem.calories, 
          carbohydrates: action.currentItem.carbohydrates, 
          fat: action.currentItem.fat, 
          proteins: action.currentItem.proteins,
          image_mobile: action.currentItem.image_mobile,
          image: action.currentItem.image,
          price: action.currentItem.price,
          type1: action.currentItem.type1,
          _id: action.currentItem._id,
          __v: action.currentItem.__v,
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
