import {
  SET_LOCATION,
  REMOVE_LOCATIONS,
  ON_CLICK,
  ON_CLICK_ITEM,
  REMOVE_ON_CLICK
} from "../../utils/constants";
import type { TLocationActions } from '../actions/location';
import { IIngredient, TIngredient, TOrderItem  } from '../../types/types';

type TLocationState = {
  locations: ReadonlyArray<string>,
  onClick: boolean,
  itemType: string | '',
  itemData: TIngredient | TOrderItem | {}
} 

export const initialState: TLocationState = {
  locations: ['', '', ''],
  onClick: false,
  itemType: '',
  itemData: {}
}

export const locationReducer = (state = initialState, action: TLocationActions): TLocationState => {
  switch (action.type) {
    case ON_CLICK:
      return {
        ...state,
        onClick: true,
        itemData: action.currentItem,
      };
    case REMOVE_ON_CLICK:
      return {
        ...state,
        onClick: false,
        itemType: '',
        itemData: {}
      };
    case ON_CLICK_ITEM:
      return {
        ...state,
        itemType: action.itemType,
      };
    case SET_LOCATION:
      return {
        ...state,
        locations: [
          action.currentLocation,
          state.locations[0],
          state.locations[1],
        ],
      };
    case REMOVE_LOCATIONS:
      return initialState
    default: {
      return state
    }
  }
} 
