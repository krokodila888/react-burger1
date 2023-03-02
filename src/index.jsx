import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
//import reportWebVitals from './reportWebVitals';
import App from './components/App/App.jsx';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/rootReducer.js';
import { compose, createStore, applyMiddleware } from 'redux';
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 
//const enhancer = composeEnhancers();
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
