import PropTypes from 'prop-types';
export const bazeUrl = 'https://norma.nomoreparties.space/api';

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

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const SEND_ORDER = 'SEND_ORDER';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SET_INGREDIENT = 'SET_INGREDIENT';
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REPLACE_INGREDIENT = 'REPLACE_INGREDIENT';
export const REPLACE_BUN = 'REPLACE_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const REMOVE_ORDER = 'REMOVE_ORDER';
export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_FAILED = 'SEND_EMAIL_FAILED';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const REMOVE_EMAIL = 'REMOVE_EMAIL';
export const SEND_REGISTER_DATA = 'SEND_REGISTER_DATA';
export const SEND_REGISTER_DATA_FAILED = 'SEND_REGISTER_DATA_FAILED';
export const SEND_REGISTER_DATA_SUCCESS = 'SEND_REGISTER_DATA_SUCCESS';
export const REMOVE_REGISTER_DATA = 'REMOVE_REGISTER_DATA';
export const SEND_LOGIN_DATA = 'SEND_LOGIN_DATA';
export const SEND_LOGIN_DATA_FAILED = 'SEND_LOGIN_DATA_FAILED';
export const SEND_LOGIN_DATA_SUCCESS = 'SEND_LOGIN_DATA_SUCCESS';
export const REMOVE_LOGIN_DATA = 'REMOVE_LOGIN_DATA';
export const SEND_PASSWORD = 'SEND_PASSWORD';
export const SEND_PASSWORD_FAILED = 'SEND_PASSWORD_FAILED';
export const SEND_PASSWORD_SUCCESS = 'SEND_PASSWORD_SUCCESS';
export const REMOVE_PASSWORD = 'REMOVE_PASSWORD';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';
export const GET_USER_REQUEST_FAILED_TOKEN = 'GET_USER_REQUEST_FAILED_TOKEN';
export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';
export const SEND_UPDATED_USER_REQUEST = 'SEND_UPDATED_USER_REQUEST';
export const SEND_USER_REQUEST_FAILED = 'SEND_USER_REQUEST_FAILED';
export const SEND_USER_REQUEST_SUCCESS = 'SEND_USER_REQUEST_SUCCESS';
export const SEND_LOGOUT_REQUEST = 'SEND_LOGOUT_USER_REQUEST';
export const SEND_LOGOUT_REQUEST_FAILED = 'SEND_LOGOUT_REQUEST_FAILED';
export const SEND_LOGOUT_REQUEST_SUCCESS = 'SEND_LOGOUT_REQUEST_SUCCESS';
export const REMOVE_LOGOUT_DATA = 'REMOVE_LOGOUT_DATA';
export const SEND_REFRESH_TOKEN_REQUEST = 'SEND_REFRESH_TOKEN_REQUEST';
export const SEND_REFRESH_TOKEN_REQUEST_FAILED = 'SEND_REFRESH_TOKEN_REQUEST_FAILED';
export const SEND_REFRESH_TOKEN_REQUEST_SUCCESS = 'SEND_REFRESH_TOKEN_REQUEST_SUCCESS';
export const REMOVE_REFRESH_TOKEN_DATA = 'REMOVE_REFRESH_TOKEN_DATA';
