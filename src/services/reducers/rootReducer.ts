import { combineReducers } from 'redux';
import { ingredientsReducer } from "./ingredientsReducer";
import { currentBurgerReducer } from "./currentBurgerReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";
import { currentOrderReducer } from "./currentOrderReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";
import { authReducer } from "./authReducer";
import {locationReducer} from './locationReducer';
import {wsReducer} from './wsReducer';

export const rootReducer = combineReducers({
  ingredientsReducer,
  currentBurgerReducer,
  currentIngredientReducer,
  currentOrderReducer,
  resetPasswordReducer,
  authReducer,
  locationReducer,
  wsReducer
}) 
