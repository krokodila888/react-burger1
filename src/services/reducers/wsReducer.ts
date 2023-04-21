import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from "../../utils/constants";

import type { TWSActions } from '../actions/wsActions';
import { TMessage, TOrderItem } from '../../types/types';

export interface IMessage {
  readonly message: any;
}

type TWSState = {
  wsConnected: boolean;
  orders: TOrderItem[];
  total: number | null;
  totalToday: number | null;
  error?: Event;
  message: TMessage | {}
}
  
const initialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
  message: {}
};

// Создадим редьюсер для WebSocket
export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
        // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
        // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
  // Опишем обработку экшена с типом WS_CONNECTION_ERROR
  // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
  // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
  // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
  // Опишем обработку экшена с типом WS_GET_MESSAGE
  // Обработка происходит, когда с сервера возвращаются данные
  // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        message: action.payload
      };
    default:
      return state;
  }
}; 
