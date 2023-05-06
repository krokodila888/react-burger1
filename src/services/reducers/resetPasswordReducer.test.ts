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

import { resetPasswordReducer, initialState } from './resetPasswordReducer';


describe('resetPasswordReducer', () => {
  const user = {
    email: 'krokodila888@yandex.ru',
    name: 'Evginia'
  }

  const messageSuccess = {
    success: true
  }

  it('should return the initial state', () => {
    expect(resetPasswordReducer(undefined, {} as any))
      .toEqual(initialState)
  })

  it('should SEND_EMAIL', () => {
    expect(resetPasswordReducer(initialState, {
      type: SEND_EMAIL,
    }))
      .toEqual({
        ...initialState,
        sendEmailRequest: true,
        sendEmailFailed: false,
      })
  })

  it('should SEND_EMAIL_SUCCESS', () => {
    expect(resetPasswordReducer(initialState, {
      type: SEND_EMAIL_SUCCESS,
      sendEmailRes: messageSuccess
    }))
      .toEqual({
        ...initialState,
        sendEmailRes: messageSuccess,
        sendEmailRequest: false,
        emailSend: true
      })
  })

  it('should SEND_EMAIL_FAILED', () => {
    expect(resetPasswordReducer(initialState, {
      type: SEND_EMAIL_FAILED,
    }))
      .toEqual({
        ...initialState,
        sendEmailFailed: true, 
        sendEmailRequest: false 
      })
  })

  it('should REMOVE_EMAIL', () => {
    expect(resetPasswordReducer(initialState, {
      type: REMOVE_EMAIL,
    }))
    .toEqual({
      ...initialState,
      sendEmailRequest: false,
      sendEmailFailed: false,
      sendEmailRes: null
    })
  })

  it('should SEND_PASSWORD', () => {
    expect(resetPasswordReducer(initialState, {
      type: SEND_PASSWORD,
    }))
      .toEqual({
        ...initialState,
        sendPasswordRequest: true,
        sendPasswordFailed: false,
      })
  })

  it('should SEND_PASSWORD_SUCCESS', () => {
    expect(resetPasswordReducer(initialState, {
      type: SEND_PASSWORD_SUCCESS,
      sendPasswordRes: messageSuccess
    }))
      .toEqual({
        ...initialState,
        sendPasswordRes: messageSuccess,
        sendPasswordRequest: false 
      })
  })

  it('should SEND_PASSWORD_FAILED', () => {
    expect(resetPasswordReducer(initialState, {
      type: SEND_PASSWORD_FAILED,
    }))
      .toEqual({
        ...initialState,
        sendPasswordFailed: true, 
        sendPasswordRequest: false 
      })
  })

  it('should REMOVE_PASSWORD', () => {
    expect(resetPasswordReducer(initialState, {
      type: REMOVE_PASSWORD,
    }))
    .toEqual({
      ...initialState,
      sendPasswordRequest: false,
      sendPasswordFailed: false,
      sendPasswordRes: null,
      emailSend: false
    })
  })
})
