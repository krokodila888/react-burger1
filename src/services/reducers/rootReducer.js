import { combineReducers } from 'redux';
import { ingredientsReducer } from "./ingredientsReducer";
import { currentBurgerReducer } from "./currentBurgerReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";
import { currentOrderReducer } from "./currentOrderReducer";

export const rootReducer = combineReducers({
  ingredientsReducer,
  currentBurgerReducer,
  currentIngredientReducer,
  currentOrderReducer
}) 
