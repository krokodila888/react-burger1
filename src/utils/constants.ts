import PropTypes from 'prop-types';
export const bazeUrl: string = 'https://norma.nomoreparties.space/api';

export const ingredientPropTypes = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired, 
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired, 
  proteins: PropTypes.number.isRequired, 
  type: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
});

export const GET_INGREDIENTS: string = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED: string = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: string = 'GET_INGREDIENTS_SUCCESS';
export const SEND_ORDER: string = 'SEND_ORDER';
export const SEND_ORDER_FAILED: string = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS: string = 'SEND_ORDER_SUCCESS';
export const SET_INGREDIENT: string = 'SET_INGREDIENT';
export const CLEAR_CURRENT_INGREDIENT: string = 'CLEAR_CURRENT_INGREDIENT';
export const ADD_INGREDIENT: string = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: string = 'REMOVE_INGREDIENT';
export const REPLACE_INGREDIENT: string = 'REPLACE_INGREDIENT';
export const REPLACE_BUN: string = 'REPLACE_BUN';
export const CLEAR_CONSTRUCTOR: string = 'CLEAR_CONSTRUCTOR';
export const REMOVE_ORDER: string = 'REMOVE_ORDER';
export const SEND_EMAIL: string = 'SEND_EMAIL';
export const SEND_EMAIL_FAILED: string = 'SEND_EMAIL_FAILED';
export const SEND_EMAIL_SUCCESS: string = 'SEND_EMAIL_SUCCESS';
export const REMOVE_EMAIL: string = 'REMOVE_EMAIL';
export const SEND_REGISTER_DATA: string = 'SEND_REGISTER_DATA';
export const SEND_REGISTER_DATA_FAILED: string = 'SEND_REGISTER_DATA_FAILED';
export const SEND_REGISTER_DATA_SUCCESS: string = 'SEND_REGISTER_DATA_SUCCESS';
export const REMOVE_REGISTER_DATA: string = 'REMOVE_REGISTER_DATA';
export const SEND_LOGIN_DATA: string = 'SEND_LOGIN_DATA';
export const SEND_LOGIN_DATA_FAILED: string = 'SEND_LOGIN_DATA_FAILED';
export const SEND_LOGIN_DATA_SUCCESS: string = 'SEND_LOGIN_DATA_SUCCESS';
export const REMOVE_LOGIN_DATA: string = 'REMOVE_LOGIN_DATA';
export const SEND_PASSWORD: string = 'SEND_PASSWORD';
export const SEND_PASSWORD_FAILED: string = 'SEND_PASSWORD_FAILED';
export const SEND_PASSWORD_SUCCESS: string = 'SEND_PASSWORD_SUCCESS';
export const REMOVE_PASSWORD: string = 'REMOVE_PASSWORD';
export const GET_USER_REQUEST: string = 'GET_USER_REQUEST';
export const GET_USER_REQUEST_FAILED: string = 'GET_USER_REQUEST_FAILED';
export const GET_USER_REQUEST_FAILED_TOKEN: string = 'GET_USER_REQUEST_FAILED_TOKEN';
export const GET_USER_REQUEST_SUCCESS: string = 'GET_USER_REQUEST_SUCCESS';
export const REMOVE_USER_DATA: string = 'REMOVE_USER_DATA';
export const SEND_UPDATED_USER_REQUEST: string = 'SEND_UPDATED_USER_REQUEST';
export const SEND_USER_REQUEST_FAILED: string = 'SEND_USER_REQUEST_FAILED';
export const SEND_USER_REQUEST_SUCCESS: string = 'SEND_USER_REQUEST_SUCCESS';
export const SEND_LOGOUT_REQUEST: string = 'SEND_LOGOUT_USER_REQUEST';
export const SEND_LOGOUT_REQUEST_FAILED: string = 'SEND_LOGOUT_REQUEST_FAILED';
export const SEND_LOGOUT_REQUEST_SUCCESS: string = 'SEND_LOGOUT_REQUEST_SUCCESS';
export const REMOVE_LOGOUT_DATA: string = 'REMOVE_LOGOUT_DATA';
export const SEND_REFRESH_TOKEN_REQUEST: string = 'SEND_REFRESH_TOKEN_REQUEST';
export const SEND_REFRESH_TOKEN_REQUEST_FAILED: string = 'SEND_REFRESH_TOKEN_REQUEST_FAILED';
export const SEND_REFRESH_TOKEN_REQUEST_SUCCESS: string = 'SEND_REFRESH_TOKEN_REQUEST_SUCCESS';
export const REMOVE_REFRESH_TOKEN_DATA: string = 'REMOVE_REFRESH_TOKEN_DATA';
export const SET_LOCATION: string = 'SET_LOCATION';
export const ON_CLICK: string = 'ON_CLICK';
export const REMOVE_ON_CLICK: string = 'REMOVE_ON_CLICK';
export const REMOVE_LOCATIONS: string = 'REMOVE_LOCATIONS';
