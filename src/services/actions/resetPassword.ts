import { api } from '../../utils/Api';

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

type TFormPassword = {
  password: string;
  token: string;
}

type TEmail = {
  email: string;
}

export interface ISendEmailAction {
  readonly type: typeof SEND_EMAIL;
}

export interface ISendEmailFailedAction {
  readonly type: typeof SEND_EMAIL_FAILED;
}

export interface ISendEmailSuccessAction {
  readonly type: typeof SEND_EMAIL_SUCCESS;
  readonly sendEmailRes: any
}

export interface ISendPasswordAction {
  readonly type: typeof SEND_PASSWORD;
}

export interface ISendPasswordFailedAction {
  readonly type: typeof SEND_PASSWORD_FAILED;
}

export interface ISendPasswordSuccessAction {
  readonly type: typeof SEND_PASSWORD_SUCCESS;
  readonly sendPasswordRes: any;
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
  sendEmailRes: any
): ISendEmailSuccessAction => ({
  type: SEND_EMAIL_SUCCESS,
  sendEmailRes
});

export const sendEmailToResetPasswordThunk = (data: any): any => (dispatch: any) => {
  dispatch(sendEmailAction());
  api.requestToResetPassword(data).then(res => {
    if (res && res.success) {
      dispatch(sendEmailSuccessAction(res));
    } else {
      dispatch(sendEmailFailedAction());
    }
  });
};

/*export function sendEmailToResetPassword(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_EMAIL
    })
    api.requestToResetPassword(data).then( res  => {
      if (res && res.success) {
        dispatch({
          type: SEND_EMAIL_SUCCESS,
          sendEmailRes: res
        })
      } else {
        dispatch({
          type: SEND_EMAIL_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_EMAIL_FAILED
      })
    })
  }
}*/

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
  sendPasswordRes: any
): ISendPasswordSuccessAction => ({
  type: SEND_PASSWORD_SUCCESS,
  sendPasswordRes
});

export const resetPasswordThunk = (data1: any): any => (dispatch: any) => {
  dispatch(sendPasswordAction());
  api.resetPassword(data1).then(res => {
    if (res && res.success) {
      dispatch(sendPasswordSuccessAction(res));
    } else {
      dispatch(sendPasswordFailedAction());
    }
  });
};

/*export function resetPassword(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_PASSWORD
    })
    api.resetPassword(data).then( res  => {
      if (res && res.success) {
        dispatch({
          type: SEND_PASSWORD_SUCCESS,
          sendPasswordRes: res
        })
      } else {
        dispatch({
          type: SEND_PASSWORD_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_PASSWORD_FAILED
      })
    })
  }
}*/

export function removePassword(): IRemovePassword {
  return {
    type: REMOVE_PASSWORD
  }
}