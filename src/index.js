import {
  AppContainer
} from 'react-hot-loader';
import React from 'react';
import {
  render as r
} from 'react-dom';

import {
  Provider
} from 'react-redux';
import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  BrowserRouter
} from 'react-router-dom';

import ReduxPromise from 'redux-promise';

import App from './components/App';

import '../style/style.css';
import '../style/style2.scss';

import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}

const render = Compo =>
  r(
    <Provider store={store}><BrowserRouter><AppContainer>
      <Compo />
    </AppContainer></BrowserRouter></Provider>,
    document.querySelector('.container')
  );

render(App);
if (module.hot) module.hot.accept('./components/App', () => render(App));
