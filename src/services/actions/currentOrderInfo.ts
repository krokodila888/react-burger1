import {
  SET_ORDER_INFO,
  CLEAR_ORDER_INFO
} from "../../utils/constants";
import { TOrderItem  } from '../../types/types';

export interface ICurrentOrderInfo {
  readonly createdAt: string;
  readonly ingredients: Array<string>;
  readonly name: string;
  readonly number: number; 
  readonly status: string;
  readonly updatedAt: string; 
  readonly _id: string,
}

export interface ISetOrderInfo {
  readonly type: typeof SET_ORDER_INFO;
  readonly currentOrderInfo: ICurrentOrderInfo;
  readonly orderInfoModalIsOpen: boolean
}

export interface IRemoveOrderInfo {
  readonly type: typeof CLEAR_ORDER_INFO;
}

export type TOrderInfoActions = 
  | ISetOrderInfo
  | IRemoveOrderInfo;

export function setOrderInfo(data: TOrderItem): ISetOrderInfo {
  return {
    type: SET_ORDER_INFO,
    currentOrderInfo: {
      createdAt: data.createdAt,
      ingredients: data.ingredients,
      name: data.name,
      number: data.number,
      status: data.status,
      updatedAt: data.updatedAt,
      _id: data._id
    },
    orderInfoModalIsOpen: true
  }
}

export const removeOrderInfo = (): IRemoveOrderInfo => ({
  type: CLEAR_ORDER_INFO
});
