import { api } from '../../utils/Api';
import { AppDispatch } from '../../services/wsMiddleware';
import { TSendEmailData, TResetPasswordData, TMessage } from '../../types/types';

import {
  SEND_EMAIL,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_SUCCESS,
  REMOVE_EMAIL,
  SEND_PASSWORD,
  SEND_PASSWORD_FAILED,
  SEND_PASSWORD_SUCCESS,
  REMOVE_PASSWORD
} from "../../utils/constants";

export interface ISendEmailAction {
  readonly type: typeof SEND_EMAIL;
}

export interface ISendEmailFailedAction {
  readonly type: typeof SEND_EMAIL_FAILED;
}

export interface ISendEmailSuccessAction {
  readonly type: typeof SEND_EMAIL_SUCCESS;
  readonly sendEmailRes: TMessage
}

export interface ISendPasswordAction {
  readonly type: typeof SEND_PASSWORD;
}

export interface ISendPasswordFailedAction {
  readonly type: typeof SEND_PASSWORD_FAILED;
}

export interface ISendPasswordSuccessAction {
  readonly type: typeof SEND_PASSWORD_SUCCESS;
  readonly sendPasswordRes: TMessage;
}

export interface IRemoveEmail {
  readonly type: typeof REMOVE_EMAIL;
}

export interface IRemovePassword {
  readonly type: typeof REMOVE_PASSWORD;
}

export type TResetPasswordActions = 
  | ISendEmailAction
  | ISendEmailFailedAction
  | ISendEmailSuccessAction
  | ISendPasswordAction
  | ISendPasswordFailedAction
  | ISendPasswordSuccessAction
  | IRemoveEmail
  | IRemovePassword;

export const sendEmailAction = (): ISendEmailAction => ({
  type: SEND_EMAIL
});

export const sendEmailFailedAction = (): ISendEmailFailedAction => ({
  type: SEND_EMAIL_FAILED
});

export const sendEmailSuccessAction = (
  sendEmailRes: TMessage
): ISendEmailSuccessAction => ({
  type: SEND_EMAIL_SUCCESS,
  sendEmailRes
});

export const sendEmailToResetPasswordThunk = (data: TSendEmailData) => (dispatch: AppDispatch) => {
  dispatch(sendEmailAction());
  api.requestToResetPassword(data)
  .then(res => {
    if (res && res.success) {
      dispatch(sendEmailSuccessAction(res));
    } else {
      dispatch(sendEmailFailedAction());
    }
  })
  .catch((res)=>console.log(res.status, res.statusText))
};

export function removeEmail(): IRemoveEmail {
  return {
    type: REMOVE_EMAIL
  }
}

export const sendPasswordAction = (): ISendPasswordAction => ({
  type: SEND_PASSWORD
});

export const sendPasswordFailedAction = (): ISendPasswordFailedAction => ({
  type: SEND_PASSWORD_FAILED
});

export const sendPasswordSuccessAction = (
  sendPasswordRes: TMessage
): ISendPasswordSuccessAction => ({
  type: SEND_PASSWORD_SUCCESS,
  sendPasswordRes
});

export const resetPasswordThunk = (data1: TResetPasswordData) => (dispatch: AppDispatch) => {
  dispatch(sendPasswordAction());
  api.resetPassword(data1)
  .then(res => {
    if (res && res.success) {
      dispatch(sendPasswordSuccessAction(res));
    } else {
      dispatch(sendPasswordFailedAction());
    }
  })
  .catch((res)=>console.log(res.status, res.statusText))
};

export function removePassword(): IRemovePassword {
  return {
    type: REMOVE_PASSWORD
  }
}