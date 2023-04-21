import { combineReducers } from 'redux';
import { ingredientsReducer } from "./ingredientsReducer";
import { currentBurgerReducer } from "./currentBurgerReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";
import { currentOrderReducer } from "./currentOrderReducer";
import { currentOrderInfoReducer } from "./currentOrderInfoReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";
import { authReducer } from "./authReducer";
import {locationReducer} from './locationReducer';
import {wsReducer} from './wsReducer';

export const rootReducer = combineReducers({
  ingredientsReducer,
  currentBurgerReducer,
  currentIngredientReducer,
  currentOrderReducer,
  currentOrderInfoReducer,
  resetPasswordReducer,
  authReducer,
  locationReducer,
  wsReducer
}) 
