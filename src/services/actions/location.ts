import {
  SET_LOCATION,
  REMOVE_LOCATIONS,
  ON_CLICK,
  ON_CLICK_ITEM,
  REMOVE_ON_CLICK
} from "../../utils/constants";
import { IIngredient, TIngredient, TOrderItem  } from '../../types/types';

export interface ISetLocation {
  readonly type: typeof SET_LOCATION;
  readonly currentLocation: string;
}

export interface IRemoveLocations {
  readonly type: typeof REMOVE_LOCATIONS;
}

export interface ISetItemType {
  readonly type: typeof ON_CLICK_ITEM;
  readonly itemType: string;
}

export interface ISetOnClick {
  readonly type: typeof ON_CLICK;
  readonly currentItem: TIngredient | TOrderItem ;
}

export interface IRemoveOnClick {
  readonly type: typeof REMOVE_ON_CLICK;
}

export type TLocationActions = 
  | ISetLocation
  | IRemoveLocations
  | ISetOnClick
  | ISetItemType
  | IRemoveOnClick;

export const setLocation = (currentLocation: string): ISetLocation => ({
  type: SET_LOCATION,
  currentLocation
}); 

export const setItemType = (itemType: 'ingredient' | 'order' | 'orderProfile'): ISetItemType => ({
  type: ON_CLICK_ITEM,
  itemType
}); 

export const removeLocations = (): IRemoveLocations => ({
  type: REMOVE_LOCATIONS
}); 

export const setOnClick = (currentItem: IIngredient | TOrderItem ): ISetOnClick => ({
  type: ON_CLICK,
  currentItem
}); 

export const removeOnClick = (): IRemoveOnClick => ({
  type: REMOVE_ON_CLICK
}); 
