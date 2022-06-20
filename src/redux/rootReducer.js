import {combineReducers} from 'redux';
import loopReducer from './Loop/loop.reducer';
import wordBagReducer from './WordBag/wordbag.reducer';

export default combineReducers({
  loop: loopReducer,
  wordBagReducer: wordBagReducer,
});
