import {
  SET_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT
} from "../../utils/constants";
import { TIngredient } from '../../types/types';

export interface ISetCurrentIngredient {
  readonly type: typeof SET_INGREDIENT;
  readonly name: string, 
  readonly image_large: string, 
  readonly calories: number, 
  readonly carbohydrates: number, 
  readonly fat: number, 
  readonly proteins: number,
  readonly image_mobile: string,
  readonly price: number,
  readonly type1: string,
  readonly _id: string,
  readonly ingredientModalIsOpen: boolean
}

export interface IRemoveCurrentIngredient {
  readonly type: typeof CLEAR_CURRENT_INGREDIENT;
}

export type TCurrentIngredientActions = 
  | ISetCurrentIngredient
  | IRemoveCurrentIngredient;

export function setCurrentIngredient(data: TIngredient): ISetCurrentIngredient {
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

export const removeCurrentIngredient = (): IRemoveCurrentIngredient => ({
  type: CLEAR_CURRENT_INGREDIENT
});
