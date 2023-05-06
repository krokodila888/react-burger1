import {
  SET_ORDER_INFO,
  CLEAR_ORDER_INFO
} from "../../utils/constants";
import type { TOrderInfoActions } from '../actions/currentOrderInfo';
import { TOrderItem } from '../../types/types';

type TCurrentOrderInfoState = {
  currentOrderInfo: TOrderItem | null,
  orderInfoModalIsOpen: boolean
} 

export const initialState: TCurrentOrderInfoState = {
  currentOrderInfo: null,
  orderInfoModalIsOpen: false
}

export const currentOrderInfoReducer = (state = initialState, action: TOrderInfoActions): TCurrentOrderInfoState => {
  switch (action.type) {
    case SET_ORDER_INFO:
      return {
        ...state,
        currentOrderInfo: {
          createdAt: action.currentOrderInfo.createdAt,
          ingredients: action.currentOrderInfo.ingredients,
          name: action.currentOrderInfo.name,
          number: action.currentOrderInfo.number,
          status: action.currentOrderInfo.status,
          updatedAt: action.currentOrderInfo.updatedAt,
          _id: action.currentOrderInfo._id
        },
        orderInfoModalIsOpen: true
      }
    case CLEAR_ORDER_INFO:
      return state
    default: {
      return state
    }
  }
} 
