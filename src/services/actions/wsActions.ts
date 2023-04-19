import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  //WS_SEND_MESSAGE,
  WS_CONNECTION_START,
} from "../../utils/constants";

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
  readonly message: any;
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
  payload: any
  //readonly message: IMessage;
}

/*export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: {message: string};
}*/

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  /*| IWSSendMessageAction*/;