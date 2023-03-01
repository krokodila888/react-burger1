import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REPLACE_INGREDIENT,
  CLEAR_CONSTRUCTOR
} from "../../utils/constants";
  
const initialState = {
  currentBurger: [
    {
      name: "Краторная булка N-200i",
      type: "bun",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      price: 1255,
      _id: "60d3b41abdacab0026a733c6",
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      proteins: 80
    }]
}

export const currentBurgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const previousIngredients = [...state.currentBurger].slice(1);
      if ((action.item.type === 'main' || 'sauce') && (action.item.type !== 'bun'))
      return {
        ...state,
        currentBurger: [
          state.currentBurger[0],
          ...previousIngredients,
          action.item
        ],
      };
      if ((action.item.type !== 'main' || 'sauce') && (action.item.type === 'bun'))
      return {
        ...state,
        currentBurger: [
          action.item,
          ...previousIngredients
      ],
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        currentBurger: state.currentBurger.filter(
          (item1) => (item1.keyId !== action.item.keyId)
        ),
      };
    }
    case REPLACE_INGREDIENT:{
      return {
        ...state,
        currentBurger: [
          state.currentBurger[0],
          ...action.items
        ],
      };
    }
    case CLEAR_CONSTRUCTOR:{
      return initialState
    }
    default: {
      return state
    }
  }
}
