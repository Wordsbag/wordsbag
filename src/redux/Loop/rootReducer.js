import {combineReducers} from 'redux';
import loopReducer from './loop.reducer';

export default combineReducers({
  loop: loopReducer,
});
