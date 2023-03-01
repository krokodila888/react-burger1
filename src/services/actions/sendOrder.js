import { api } from '../../utils/Api';

import {
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  REMOVE_ORDER
} from "../../utils/constants";

export function sendNewOrder1(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_ORDER
    })
    api.sendOrder(data).then( res  => {
      if (res && res.success) {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          sendOrder: res,
          sendOrderNumber: res.order.number
        })
      } else {
        dispatch({
          type: SEND_ORDER_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_ORDER_FAILED
      })
    })
  }
}

export function removeOrder() {
  return {
    type: REMOVE_ORDER
  }
} 
