import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, useLocation, Routes, Route } from 'react-router-dom';
import App from './components/App/App';

import { store } from "./services/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLFormElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
