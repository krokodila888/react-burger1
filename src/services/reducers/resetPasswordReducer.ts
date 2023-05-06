import { TMessage } from "../../types/types";
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
import type { TResetPasswordActions } from '../actions/resetPassword';

type TResetPasswordState = {
  sendEmailRequest: boolean,
  sendEmailFailed: boolean,
  sendEmailRes: TMessage | null,
  emailSend: boolean,
  sendPasswordRequest: boolean,
  sendPasswordFailed: boolean,
  sendPasswordRes: TMessage | null
} 

export const initialState: TResetPasswordState = {
  sendEmailRequest: false,
  sendEmailFailed: false,
  sendEmailRes: null,
  emailSend: false,
  sendPasswordRequest: false,
  sendPasswordFailed: false,
  sendPasswordRes: null
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions): TResetPasswordState => {
  switch (action.type) {
    case SEND_EMAIL: {
      return {
        ...state,
        sendEmailRequest: true,
        sendEmailFailed: false,
      };
    }
    case SEND_EMAIL_SUCCESS: {
      return { 
        ...state, 
        sendEmailRes: action.sendEmailRes,
        sendEmailRequest: false,
        emailSend: true
      };
    }
    case SEND_EMAIL_FAILED: {
      return { 
        ...state, 
        sendEmailFailed: true, 
        sendEmailRequest: false 
      };
    }
    case REMOVE_EMAIL: {
      return {
        ...state,
        sendEmailRequest: false,
        sendEmailFailed: false,
        sendEmailRes: null
      };
    }
    case SEND_PASSWORD: {
      return {
        ...state,
        sendPasswordRequest: true,
        sendPasswordFailed: false,
      };
    }
    case SEND_PASSWORD_SUCCESS: {
      return { 
        ...state, 
        sendPasswordRes: action.sendPasswordRes,
        sendPasswordRequest: false 
      };
    }
    case SEND_PASSWORD_FAILED: {
      return { 
        ...state, 
        sendPasswordFailed: true, 
        sendPasswordRequest: false 
      };
    }
    case REMOVE_PASSWORD: {
      return {
        ...state,
        sendPasswordRequest: false,
        sendPasswordFailed: false,
        sendPasswordRes: null,
        emailSend: false
      };
    }
    default: {
      return state
    }
  }
} 
