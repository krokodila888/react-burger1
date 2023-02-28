import {
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS
} from "../../utils/constants";

const initialState = {
  sendOrderRequest: false,
  sendOrderFailed: false,
  sendOrder: {},
  sendOrderNumber: 0
}

export const currentOrderReducer = (state = initialState, action) => {
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
    default: {
      return state
    }
  }
} 
