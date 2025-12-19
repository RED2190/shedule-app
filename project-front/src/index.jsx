import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './index.scss';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

root.render(
    <Provider store={store} > 
      <Router>
          <App />
      </Router>
    </Provider>

);
