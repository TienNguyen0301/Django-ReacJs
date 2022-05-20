import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { createStore } from 'redux';
import mainReducer from './reducers/RootReducer';
import {  Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';




const store = createStore(mainReducer)

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);


reportWebVitals();
