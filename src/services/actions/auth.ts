import { api } from '../../utils/Api';

import {
  SEND_LOGIN_DATA,
  SEND_LOGIN_DATA_FAILED,
  SEND_LOGIN_DATA_SUCCESS,
  REMOVE_LOGIN_DATA,
  SEND_REGISTER_DATA,
  SEND_REGISTER_DATA_FAILED,
  SEND_REGISTER_DATA_SUCCESS,
  REMOVE_REGISTER_DATA,
  GET_USER_REQUEST,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_FAILED_TOKEN,
  GET_USER_REQUEST_SUCCESS,
  SEND_UPDATED_USER_REQUEST,
  SEND_USER_REQUEST_FAILED,
  SEND_USER_REQUEST_SUCCESS,
  REMOVE_USER_DATA,
  SEND_LOGOUT_REQUEST,
  SEND_LOGOUT_REQUEST_FAILED,
  SEND_LOGOUT_REQUEST_SUCCESS,
  REMOVE_LOGOUT_DATA,
  SEND_REFRESH_TOKEN_REQUEST,
  SEND_REFRESH_TOKEN_REQUEST_FAILED, 
  SEND_REFRESH_TOKEN_REQUEST_SUCCESS,
  REMOVE_REFRESH_TOKEN_DATA
} from "../../utils/constants";

export interface ILoginAction {
  readonly type: typeof SEND_LOGIN_DATA;
}

export interface ILoginFailedAction {
  readonly type: typeof SEND_LOGIN_DATA_FAILED;
}

export interface ILoginSuccessAction {
  readonly type: typeof SEND_LOGIN_DATA_SUCCESS;
  readonly sendLogin: any;
}

export interface IRemoveLogin {
  readonly type: typeof REMOVE_LOGIN_DATA;
}

export interface IRegisterAction {
  readonly type: typeof SEND_REGISTER_DATA;
}

export interface IRegisterFailedAction {
  readonly type: typeof SEND_REGISTER_DATA_FAILED;
}

export interface IRegisterSuccessAction {
  readonly type: typeof SEND_REGISTER_DATA_SUCCESS;
  readonly sendRegister: any;
}

export interface IRemoveRegister {
  readonly type: typeof REMOVE_REGISTER_DATA;
}

export interface IRemoveTokenRequest {
  readonly type: typeof REMOVE_REFRESH_TOKEN_DATA;
}

export interface IRemoveLogoutData {
  readonly type: typeof REMOVE_LOGOUT_DATA;
}

export interface IRemoveUserData {
  readonly type: typeof REMOVE_USER_DATA;
}

export interface IGetUserDataAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserDataFailedAction {
  readonly type: typeof GET_USER_REQUEST_FAILED;
  readonly userData: any;
}

export interface IGetUserDataFailedTokenAction {
  readonly type: typeof GET_USER_REQUEST_FAILED_TOKEN;
}

export interface IGetUserDataSuccessAction {
  readonly type: typeof GET_USER_REQUEST_SUCCESS;
  readonly userData: any;
}

export interface IUpdateUserAction {
  readonly type: typeof SEND_UPDATED_USER_REQUEST;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof SEND_USER_REQUEST_FAILED;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof SEND_USER_REQUEST_SUCCESS;
  readonly newUserData: any;
}

export interface ILogoutAction {
  readonly type: typeof SEND_LOGOUT_REQUEST;
}

export interface ILogoutFailedAction {
  readonly type: typeof SEND_LOGOUT_REQUEST_FAILED;
}

export interface ILogoutSuccessAction {
  readonly type: typeof SEND_LOGOUT_REQUEST_SUCCESS;
  readonly logOutRequest: any;
}

export interface IRefreshTokenAction {
  readonly type: typeof SEND_REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenFailedAction {
  readonly type: typeof SEND_REFRESH_TOKEN_REQUEST_FAILED;
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof SEND_REFRESH_TOKEN_REQUEST_SUCCESS;
  readonly refreshTokenRequest: any;
}

export type TAuthActions = 
  | ILoginAction
  | ILoginFailedAction
  | ILoginSuccessAction
  | IRemoveLogin
  | IRegisterAction
  | IRegisterFailedAction
  | IRegisterSuccessAction
  | IGetUserDataAction
  | IGetUserDataFailedAction
  | IGetUserDataSuccessAction
  | IGetUserDataFailedTokenAction
  | IUpdateUserAction
  | IUpdateUserFailedAction
  | IUpdateUserSuccessAction
  | ILogoutAction
  | ILogoutFailedAction
  | ILogoutSuccessAction
  | IRemoveRegister
  | IRemoveLogoutData
  | IRemoveUserData
  | IRemoveTokenRequest
  | IRefreshTokenAction
  | IRefreshTokenFailedAction
  | IRefreshTokenSuccessAction;

export const loginAction = (): ILoginAction => ({
  type: SEND_LOGIN_DATA
});

export const loginFailedAction = (): ILoginFailedAction => ({
  type: SEND_LOGIN_DATA_FAILED
});

export const loginSuccessAction = (
  sendLogin: any
): ILoginSuccessAction => ({
  type: SEND_LOGIN_DATA_SUCCESS,
  sendLogin
});

export const loginThunk = (data: any): any => (dispatch: any) => {
  dispatch(loginAction());
  api.signIn(data).then(res => {
    if (res && res.success) {
      dispatch(loginSuccessAction(res));
    } else {
      dispatch(loginFailedAction());
    }
  });
};

export const registerAction = (): IRegisterAction => ({
  type: SEND_REGISTER_DATA
});

export const registerFailedAction = (): IRegisterFailedAction => ({
  type: SEND_REGISTER_DATA_FAILED
});

export const registerSuccessAction = (
  sendRegister: any
): IRegisterSuccessAction => ({
  type: SEND_REGISTER_DATA_SUCCESS,
  sendRegister
});

export const registerThunk = (data: any): any => (dispatch: any) => {
  dispatch(registerAction());
  api.signUp(data).then(res => {
    if (res && res.success) {
      dispatch(registerSuccessAction(res));
    } else {
      dispatch(registerFailedAction());
    }
  });
};

export function removeLogin(): IRemoveLogin {
  return {
    type: REMOVE_LOGIN_DATA
  }
}

export function removeRegister(): IRemoveRegister {
  return {
    type: REMOVE_REGISTER_DATA
  }
}

export const getUserDataAction = (): IGetUserDataAction => ({
  type: GET_USER_REQUEST
});

export const getUserDataFailedAction = (userData: any): IGetUserDataFailedAction => ({
  type: GET_USER_REQUEST_FAILED,
  userData
});

export const getUserDataFailedTokenAction = (
): IGetUserDataFailedTokenAction => ({
  type: GET_USER_REQUEST_FAILED_TOKEN,
});

export const getUserDataSuccessAction = (
  userData: any
): IGetUserDataSuccessAction => ({
  type: GET_USER_REQUEST_SUCCESS,
  userData
});

export const getUserDataThunk = (): any => (dispatch: any) => {
  dispatch(getUserDataAction());
  api.getUserRequest().then(res => {
    if (res && res.success) {
      dispatch(getUserDataSuccessAction(res));}
    else if (res && !res.success) {
      console.log(res);
      dispatch(getUserDataFailedTokenAction());
    } else {
      dispatch(getUserDataFailedAction(res));
    }
  });
};

export const updateUserAction = (): IUpdateUserAction => ({
  type: SEND_UPDATED_USER_REQUEST
});

export const updateUserFailedAction = (): IUpdateUserFailedAction => ({
  type: SEND_USER_REQUEST_FAILED
});

export const updateUserSuccessAction = (
  newUserData: any
): IUpdateUserSuccessAction => ({
  type: SEND_USER_REQUEST_SUCCESS,
  newUserData
});

export const updateUserDataThunk = (data: any): any => (dispatch: any) => {
  dispatch(updateUserAction());
  api.updateUser(data).then(res => {
    if (res && res.success) {
      dispatch(updateUserSuccessAction(res));
    } else {
      dispatch(updateUserFailedAction());
    }
  });
};

export const logoutAction = (): ILogoutAction => ({
  type: SEND_LOGOUT_REQUEST
});

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: SEND_LOGOUT_REQUEST_FAILED
});

export const logoutSuccessAction = (
  logOutRequest: any
): ILogoutSuccessAction => ({
  type: SEND_LOGOUT_REQUEST_SUCCESS,
  logOutRequest
});

export const logoutThunk = (): any => (dispatch: any) => {
  dispatch(logoutAction());
  api.signOut().then(res => {
    if (res && res.success) {
      dispatch(logoutSuccessAction(res));
    } else {
      dispatch(logoutFailedAction());
    }
  });
};

export function removeLogOutData(): IRemoveLogoutData {
  return {
    type: REMOVE_LOGOUT_DATA
  }
}

export function removeUserData(): IRemoveUserData {
  return {
    type: REMOVE_USER_DATA
  }
} 

export const refreshTokenAction = (): IRefreshTokenAction => ({
  type: SEND_REFRESH_TOKEN_REQUEST
});

export const refreshTokenFailedAction = (): IRefreshTokenFailedAction => ({
  type: SEND_REFRESH_TOKEN_REQUEST_FAILED
});

export const refreshTokenSuccessAction = (
  refreshTokenRequest: any
): IRefreshTokenSuccessAction => ({
  type: SEND_REFRESH_TOKEN_REQUEST_SUCCESS,
  refreshTokenRequest
});

export const getNewTokenThunk = (): any => (dispatch: any) => {
  if (localStorage.getItem('refreshToken') !== null || {}) {
  dispatch(refreshTokenAction());
  api.refreshToken(localStorage.getItem('refreshToken') || '{}').then(res => {
    if (res && res.success) {
      dispatch(refreshTokenSuccessAction(res));
    } else {
      dispatch(refreshTokenFailedAction());
    }
  });}
};

export function removeTokenRequest(): IRemoveTokenRequest {
  return {
    type: REMOVE_REFRESH_TOKEN_DATA
  }
}
