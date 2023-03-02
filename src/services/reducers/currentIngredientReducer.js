import {
  SET_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT
} from "../../utils/constants";

const initialState = {
  currentItem: {},
  ingredientModalIsOpen: false
}

export const currentIngredientReducer = (state = initialState, action) => {
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
          price: action.price,
          type1: action.type,
          _id: action._id
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
