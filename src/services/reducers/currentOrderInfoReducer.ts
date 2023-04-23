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

const initialState: TCurrentOrderInfoState = {
  currentOrderInfo: null,
  orderInfoModalIsOpen: false
}

export const currentOrderInfoReducer = (state = initialState, action: TOrderInfoActions): TCurrentOrderInfoState => {
  switch (action.type) {
    case SET_ORDER_INFO:
      return {
        ...state,
        currentOrderInfo: {
          createdAt: action.createdAt,
          ingredients: action.ingredients,
          name: action.name,
          number: action.number,
          status: action.status,
          updatedAt: action.updatedAt,
          _id: action._id
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
