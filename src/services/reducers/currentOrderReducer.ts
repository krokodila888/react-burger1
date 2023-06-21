import {
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  REMOVE_ORDER
} from "../../utils/constants";
import type { TSendOrderActions } from '../actions/sendOrder';
import { TOrderMessageSuccess, TOrderMessage } from '../../types/types';


type TSendOrderState = {
  sendOrderRequest: boolean,
  sendOrderFailed: boolean,
  sendOrder: TOrderMessage | {},
  sendOrderNumber: number | null
} 

export const initialState: TSendOrderState = {
  sendOrderRequest: false,
  sendOrderFailed: false,
  sendOrder: {},
  sendOrderNumber: null
}

export const currentOrderReducer = (state = initialState, action: TSendOrderActions): TSendOrderState => {
  switch (action.type) {
    case SEND_ORDER: {
      return {
        ...state,
        sendOrderRequest: true,
        sendOrderFailed: false,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return { 
        ...state, 
        sendOrder: action.sendOrder,
        sendOrderNumber: action.sendOrder.order.number, 
        sendOrderRequest: false 
      };
    }
    case SEND_ORDER_FAILED: {
      return { 
        ...state, 
        sendOrderFailed: true, 
        sendOrderRequest: false 
      };
    }
    case REMOVE_ORDER: {
      return initialState
    }
    default: {
      return state
    }
  }
} 
