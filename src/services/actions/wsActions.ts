import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from "../../utils/constants";
import { TMessage, TOrderItem, TWSMessage } from '../../types/types';

//import type { IMessage, IUserResponse } from "./modelsData";

/*export interface IJoinChatAction {
  readonly type: typeof JOIN_CHAT;
}

export interface IJoinChatFailedAction {
  readonly type: typeof JOIN_CHAT_FAILED;
}

export interface IJoinChatSuccessAction {
  readonly type: typeof JOIN_CHAT_SUCCESS;
  readonly user: IUserResponse;
}

export type TUserActions =
  | IJoinChatAction
  | IJoinChatFailedAction
  | IJoinChatSuccessAction;*/

export interface IMessage {
  readonly message: TWSMessage;
}

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  payload: string | URL
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  //readonly message: /*Event*/IMessage;
  payload: Event
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload:  TWSMessage
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction;