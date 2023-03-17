import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REPLACE_INGREDIENT,
  CLEAR_CONSTRUCTOR
} from "../../utils/constants";

export function setIngredient(data) {
  return {
    type: ADD_INGREDIENT,
    item: data
  }
}

export function removeIngredient(data) {
  return {
    type: REMOVE_INGREDIENT,
    item: data
  }
} 

export function replaceIngredient(data) {
  return {
    type: REPLACE_INGREDIENT,
    items: data
  }
} 

export function clearConstructor() {
  return {
    type: CLEAR_CONSTRUCTOR
  }
} 
