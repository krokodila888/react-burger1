import {
  SET_LOCATION,
  REMOVE_LOCATIONS,
  ON_CLICK,
  REMOVE_ON_CLICK
} from "../../utils/constants";
import { IIngredient, TIngredient } from '../../types/types';

export interface ISetLocation {
  readonly type: typeof SET_LOCATION;
  readonly currentLocation: string;
}

export interface IRemoveLocations {
  readonly type: typeof REMOVE_LOCATIONS;
}

export interface ISetOnClick {
  readonly type: typeof ON_CLICK;
  readonly currentItem: TIngredient;
}

export interface IRemoveOnClick {
  readonly type: typeof REMOVE_ON_CLICK;
}

export type TLocationActions = 
  | ISetLocation
  | IRemoveLocations
  | ISetOnClick
  | IRemoveOnClick;

export const setLocation = (currentLocation: string): ISetLocation => ({
  type: SET_LOCATION,
  currentLocation
}); 

export const removeLocations = (): IRemoveLocations => ({
  type: REMOVE_LOCATIONS
}); 

export const setOnClick = (currentItem: IIngredient): ISetOnClick => ({
  type: ON_CLICK,
  currentItem
}); 

export const removeOnClick = (): IRemoveOnClick => ({
  type: REMOVE_ON_CLICK
}); 
