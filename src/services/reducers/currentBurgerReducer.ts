import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REPLACE_INGREDIENT,
  CLEAR_CONSTRUCTOR
} from "../../utils/constants";
import type { TCurrentBurgerActions } from '../actions/currentBurger';
import { TIngredient } from '../../types/types';

type TCurrentBurgerState = {
  currentBurger: ReadonlyArray<TIngredient>
} 
  
const initialState: TCurrentBurgerState = {
  currentBurger: [
    {
      name: "Краторная булка N-200i",
      type: "bun",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      price: 1255,
      _id: "643d69a5c3f7b9001cfa093c",
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      proteins: 80,
      __v: 0
    }]
}

export const currentBurgerReducer = (state = initialState, action:  TCurrentBurgerActions): TCurrentBurgerState => {
  switch (action.type) {
    // @ts-ignore
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
      else if ((action.item.type !== 'main' || 'sauce') && (action.item.type === 'bun'))
      return {
        ...state,
        currentBurger: [
          action.item,
          ...previousIngredients
      ],
    };};
    case REMOVE_INGREDIENT: 
      return {
        ...state,
        currentBurger: state.currentBurger.filter(
          (item1: any) => (item1.keyId !== action.item.keyId)
        ),
      };
    case REPLACE_INGREDIENT:
      return {
        ...state,
        currentBurger: [
          state.currentBurger[0],
          ...action.items
        ],
      };
    case CLEAR_CONSTRUCTOR:{
      return initialState
    }
    default: {
      return state
    }
  }
}
