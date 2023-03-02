import {
  SET_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT
} from "../../utils/constants";

export function setCurrentIngredient(data) {
  return {
    type: SET_INGREDIENT,
    name: data.name, 
    image_large: data.image_large, 
    calories: data.calories, 
    carbohydrates: data.carbohydrates, 
    fat: data.fat, 
    proteins: data.proteins,
    image_mobile: data.image_mobile,
    price: data.price,
    type1: data.type,
    _id: data._id,
    ingredientModalIsOpen: true
  }
}

export function removeCurrentIngredient() {
  return {
    type: CLEAR_CURRENT_INGREDIENT
  }
} 
