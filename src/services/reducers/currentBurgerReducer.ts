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
  currentBurger: []
}

export const currentBurgerReducer = (state = initialState, action:  TCurrentBurgerActions): TCurrentBurgerState => {
  switch (action.type) {
    // @ts-ignore
    case ADD_INGREDIENT: {
      const previousIngredients = [...state.currentBurger];
      if ((action.item.type === 'main' || 'sauce') && (action.item.type !== 'bun'))
      return {
        ...state,
        currentBurger: [
          ...previousIngredients,
          action.item
        ],
      };
      else if ((action.item.type !== 'main' || 'sauce') && (action.item.type === 'bun') && previousIngredients.find((item) => item.type === 'bun'))
      return {
        ...state,
        currentBurger: [
          action.item,
          ...previousIngredients.slice(1)
        ],
      };
      else if ((action.item.type !== 'main' || 'sauce') && (action.item.type === 'bun'))
      return {
        ...state,
        currentBurger: [
          action.item,
          ...previousIngredients
        ],
      }};
    // eslint-disable-next-line no-fallthrough
    case REMOVE_INGREDIENT: 
      return {
        ...state,
        currentBurger: state.currentBurger.filter(
          (item1: any) => (item1.keyId !== action.item.keyId)
        ),
      };
// eslint-disable-next-line no-fallthrough, no-lone-blocks
    // @ts-ignore
    case REPLACE_INGREDIENT: {
      if (state.currentBurger[0].type === 'bun')
      return {
        ...state,
        currentBurger: [
          state.currentBurger[0],
          ...action.items
        ],
      };
      else /*if (state.currentBurger[0].type !== 'bun')*/
      return {
        ...state,
        currentBurger: [
          ...action.items
        ],
    }};
      /*return {
        ...state,
        currentBurger: [
          state.currentBurger[0],
          ...action.items
        ],
      };*/
    case CLEAR_CONSTRUCTOR:{
      return initialState
    }
    default: {
      return state
    }
  }
}
