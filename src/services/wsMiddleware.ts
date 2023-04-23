import type { Middleware, MiddlewareAPI } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,

} from "../utils/constants";

import { store, TAppActions } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>(); 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlForUser: string = 'wss://norma.nomoreparties.space/orders';

export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR,
  onMessage: typeof WS_GET_MESSAGE,
};

export const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;

  return next => (action: TAppActions) => {
    const { dispatch } = store;
    // @ts-ignore
    const { type, payload } = action;
    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

    if (type === wsInit) {
      if (socket) {
        socket.close();
      }
      socket = new WebSocket(payload);
    }

    if (socket) {
      socket.onopen = event => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = event => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = event => {
        const { data } = event;
        dispatch({ type: onMessage, payload: JSON.parse(data) });
      };

      socket.onclose = event => {
        dispatch({ type: onClose, payload: event });
      };
    }

    next(action);
  };
  }) as Middleware;
}; 
