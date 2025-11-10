import React from 'react';
import ReactDOM from 'react-dom/client';



import'./index.css';

import Nav from './House/navigation/Nav';
import Section from './House/Section/Section';
import App from './App';
import Routeres from './House/router';
import { Provider } from 'react-redux';
import { store } from './House/redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
 <Routeres/>
 </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

