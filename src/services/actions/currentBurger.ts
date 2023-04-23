import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REPLACE_INGREDIENT,
  CLEAR_CONSTRUCTOR
} from "../../utils/constants";
import { TIngredient } from '../../types/types';

export interface ISetIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TIngredient;
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly item: TIngredient;
}

export interface IReplaceIngredient {
  readonly type: typeof REPLACE_INGREDIENT;
  readonly items: ReadonlyArray<TIngredient>;
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TCurrentBurgerActions = 
  | ISetIngredient
  | IRemoveIngredient
  | IReplaceIngredient
  | IClearConstructor;

export function setIngredient(data: TIngredient): ISetIngredient {
  return {
    type: ADD_INGREDIENT,
    item: data
  }
}

export function removeIngredient(data: TIngredient): IRemoveIngredient {
  return {
    type: REMOVE_INGREDIENT,
    item: data
  }
} 

export function replaceIngredient(data: Array<TIngredient>) : IReplaceIngredient {
  return {
    type: REPLACE_INGREDIENT,
    items: data
  }
} 

export function clearConstructor(): IClearConstructor {
  return {
    type: CLEAR_CONSTRUCTOR
  }
} 
