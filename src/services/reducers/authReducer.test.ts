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
import { authReducer, initialState } from './authReducer';


describe('authReducer', () => {
  const user = {
    email: 'krokodila888@yandex.ru',
    name: 'Evginia'
  }

  const messageSuccess = {
    success: true,
    user: user,
    accessToken: '111',
    refreshToken: '222'
  }

  it('should SEND_REGISTER_DATA', () => {
    expect(authReducer(initialState, {
      type: SEND_REGISTER_DATA,
    }))
      .toEqual({
        ...initialState,
        sendRegisterRequest: true,
        sendRegisterFailed: false,
      })
  })

  it('should SEND_REGISTER_DATA_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: SEND_REGISTER_DATA_SUCCESS,
      sendRegister: messageSuccess
    }))
      .toEqual({
        ...initialState,
        sendRegister: messageSuccess,
        sendRegisterRequest: false 
      })
  })

  it('should SEND_REGISTER_DATA_FAILED', () => {
    expect(authReducer(initialState, {
      type: SEND_REGISTER_DATA_FAILED,
    }))
      .toEqual({
        ...initialState,
        sendRegisterFailed: true, 
        sendRegisterRequest: false 
      })
  })

  it('should REMOVE_REGISTER_DATA', () => {
    expect(authReducer(initialState, {
      type: REMOVE_REGISTER_DATA,
    }))
      .toEqual({
        ...initialState,
        sendRegisterRequest: false,
        sendRegisterFailed: false,
        sendRegister: null
      })
  })

  it('should SEND_LOGIN_DATA', () => {
    expect(authReducer(initialState, {
      type: SEND_LOGIN_DATA,
    }))
      .toEqual({
        ...initialState,
        sendLoginRequest: true,
        sendLoginFailed: false,
      })
  })

  it('should SEND_LOGIN_DATA_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: SEND_LOGIN_DATA_SUCCESS,
      sendLogin: messageSuccess
    }))
      .toEqual({
        ...initialState,
        sendLogin: messageSuccess,
        user: messageSuccess.user,
        sendLoginRequest: false 
      })
  })

  it('should SEND_LOGIN_DATA_FAILED', () => {
    expect(authReducer(initialState, {
      type: SEND_LOGIN_DATA_FAILED,
    }))
      .toEqual({
        ...initialState,
        sendLoginFailed: true, 
        sendLoginRequest: false 
      })
  })

  it('should REMOVE_LOGIN_DATA', () => {
    expect(authReducer(initialState, {
      type: REMOVE_LOGIN_DATA,
    }))
      .toEqual({
        ...initialState,
        sendLoginRequest: false,
        sendLoginFailed: false,
        sendLogin: null
      })
  })

  it('should GET_USER_REQUEST', () => {
    expect(authReducer(initialState, {
      type: GET_USER_REQUEST
    }))
    .toEqual({
      ...initialState,
      getUserDataRequest: true,
      getUserDataRequestFailed: false,
    })
  })

  it('should GET_USER_REQUEST_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: GET_USER_REQUEST_SUCCESS,
      userData: messageSuccess
    }))
    .toEqual({
      ...initialState,
      userDataRequestRes: messageSuccess,
      user: messageSuccess.user,
      getUserDataRequest: false 
    })
  })

  it('should GET_USER_REQUEST_FAILED', () => {
    expect(authReducer(initialState, {
      type: GET_USER_REQUEST_FAILED,
    }))
      .toEqual({
        ...initialState,
        getUserDataRequestFailed: true, 
        getUserDataRequest: false 
      })
  })

  it('should GET_USER_REQUEST_FAILED_TOKEN', () => {
    expect(authReducer(initialState, {
      type: GET_USER_REQUEST_FAILED_TOKEN
    }))
      .toEqual({
        ...initialState,
        getUserDataRequestFailed: true,
        getUserDataRequest: false 
      })
  })

  it('should SEND_UPDATED_USER_REQUEST', () => {
    expect(authReducer(initialState, {
      type: SEND_UPDATED_USER_REQUEST,
    }))
      .toEqual({
        ...initialState,
        updateUserDataRequest: true,
        updateUserDataRequestFailed: false,
      })
  })

  it('should SEND_USER_REQUEST_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: SEND_USER_REQUEST_SUCCESS,
      newUserData: messageSuccess
    }))
      .toEqual({
        ...initialState,
        updateUserData: messageSuccess,
        user: messageSuccess.user,
        updateUserDataRequest: false 
      })
  })

  it('should SEND_USER_REQUEST_FAILED', () => {
    expect(authReducer(initialState, {
      type: SEND_USER_REQUEST_FAILED
    }))
      .toEqual({
        ...initialState,
        updateUserDataRequestFailed: true, 
        updateUserDataRequest: false
      })
  })

  it('should REMOVE_USER_DATA', () => {
    expect(authReducer(initialState, {
      type: REMOVE_USER_DATA,
    }))
      .toEqual({
        ...initialState,
        getUserDataRequest: false,
        getUserDataRequestFailed: false,
        updateUserDataRequest: false,
        updateUserDataRequestFailed: false,
        updateUserData: null,
        user: null
      })
  })

  it('should SEND_LOGOUT_REQUEST', () => {
    expect(authReducer(initialState, {
      type: SEND_LOGOUT_REQUEST,
    }))
      .toEqual({
        ...initialState,
        sendLogOutRequest: true,
        sendLogOutRequestFailed: false,
      })
  })

  it('should SEND_LOGOUT_REQUEST_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: SEND_LOGOUT_REQUEST_SUCCESS,
      logOutRequest: messageSuccess
    }))
      .toEqual({
        ...initialState,
        logOutRequest: messageSuccess,
        sendLogOutRequest: false 
      })
  })

  it('should SEND_LOGOUT_REQUEST_FAILED', () => {
    expect(authReducer(initialState, {
      type: SEND_LOGOUT_REQUEST_FAILED
    }))
      .toEqual({
        ...initialState,
        sendLogOutRequestFailed: true, 
        sendLogOutRequest: false 
      })
  })

  it('should REMOVE_LOGOUT_DATA', () => {
    expect(authReducer(initialState, {
      type: REMOVE_LOGOUT_DATA
    }))
      .toEqual({
        ...initialState,
        sendLogOutRequest: false,
        sendLogOutRequestFailed: false,
        logOutRequest: null,
      })
  })

  it('should SEND_REFRESH_TOKEN_REQUEST', () => {
    expect(authReducer(initialState, {
      type: SEND_REFRESH_TOKEN_REQUEST
    }))
      .toEqual({
        ...initialState,
        sendRefreshTokenRequest: true,
        sendRefreshTokenFailed: false,
      })
  })

  it('should SEND_REFRESH_TOKEN_REQUEST_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: SEND_REFRESH_TOKEN_REQUEST_SUCCESS,
      refreshTokenRequest: messageSuccess
    }))
      .toEqual({
        ...initialState,
        refreshToken: messageSuccess,
        sendRegisterRequest: false 
      })
  })

  it('should SEND_REFRESH_TOKEN_REQUEST_FAILED', () => {
    expect(authReducer(initialState, {
      type: SEND_REFRESH_TOKEN_REQUEST_FAILED
    }))
      .toEqual({
        ...initialState,
        sendRefreshTokenFailed: true, 
        sendRefreshTokenRequest: false
      })
  })

  it('should REMOVE_REFRESH_TOKEN_DATA', () => {
    expect(authReducer(initialState, {
      type: REMOVE_REFRESH_TOKEN_DATA
    }))
      .toEqual({
        ...initialState,
        sendRefreshTokenRequest: false,
        sendRefreshTokenFailed: false,
        refreshToken: null,
      })
  })

  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as any))
      .toEqual(initialState)
  })
})