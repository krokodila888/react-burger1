import { api } from '../../utils/Api';

import {
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  REMOVE_ORDER
} from "../../utils/constants";
import { IIngredient, TIngredient } from '../../types/types';

export interface ISendOrderAction {
  readonly type: typeof SEND_ORDER;
}

export interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly sendOrder: any;
  readonly sendOrderNumber: number;
}

export interface IRemoveOrder {
  readonly type: typeof REMOVE_ORDER;
}

export type TSendOrderActions = 
  | ISendOrderAction
  | ISendOrderFailedAction
  | ISendOrderSuccessAction
  | IRemoveOrder;

export const sendOrderAction = (): ISendOrderAction => ({
  type: SEND_ORDER
});

export const sendOrderFailedAction = (): ISendOrderFailedAction => ({
  type: SEND_ORDER_FAILED
});

export const sendOrderSuccessAction = (
  sendOrder: any, sendOrderNumber:number
): ISendOrderSuccessAction => ({
  type: SEND_ORDER_SUCCESS,
  sendOrder,
  sendOrderNumber
});

export const sendNewOrderThunk = (data: any): any => (dispatch: any) => {
  dispatch(sendOrderAction());
  api.sendOrder(data).then(res => {
    if (res && res.success) {
      dispatch(sendOrderSuccessAction(res, res.order.number));
    } else {
      dispatch(sendOrderFailedAction());
    }
  });
};

export const removeOrder = (): IRemoveOrder => ({
  type: REMOVE_ORDER
});
