import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './index.scss';
import App from './App';

import configureStore from './Redux/store';
import { history } from './Redux/store';
import * as serviceWorker from './serviceWorker';

/* 创建store */
const store = configureStore();

ReactDOM.render(
   <Provider store={ store }>
      <ConnectedRouter history={ history }>
         <App />
      </ConnectedRouter>
   </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
