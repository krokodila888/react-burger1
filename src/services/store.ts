import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import { TAuthActions } from './actions/auth';
import { TCurrentBurgerActions } from './actions/currentBurger';
import { TCurrentIngredientActions } from './actions/currentIngredient';
import { TGetIngredientsActions } from './actions/ingredients';
import { TLocationActions } from './actions/location';
import { TResetPasswordActions } from './actions/resetPassword';
import { TWSActions } from './actions/wsActions';
import { socketMiddleware } from './wsMiddleware';
import { rootReducer } from './reducers/rootReducer';
import { wsActions } from './wsMiddleware';

export type TAppActions = 
  | TAuthActions
  | TCurrentBurgerActions
  | TCurrentIngredientActions
  | TGetIngredientsActions
  | TLocationActions
  | TResetPasswordActions
  | TWSActions;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    thunk, 
    socketMiddleware(wsActions)
  ))
);
