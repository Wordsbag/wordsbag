/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './Loop/rootReducer';
import thunk from 'redux-thunk';

export const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);
export default store;
