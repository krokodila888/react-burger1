import { api } from '../../utils/Api';
import { TIngredient } from '../../types/types';

import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS
} from "../../utils/constants";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

export type TGetIngredientsActions = 
  | IGetIngredientsAction
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccessAction;

  export const getIngredientsAction = (): IGetIngredientsAction => ({
    type: GET_INGREDIENTS
  });
  
  export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
  });
  
  export const getIngredientsSuccessAction = (
    ingredients: Array<TIngredient>
  ): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
  });

export const getIngredients = (): any => (dispatch: any) => {
  dispatch(getIngredientsAction());
  api.getIngredients().then(res => {
    if (res && res.success) {
      dispatch(getIngredientsSuccessAction(res.data));
    } else {
      dispatch(getIngredientsFailedAction());
    }
  });
};
