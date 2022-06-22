import {combineReducers} from 'redux';
import loopReducer from './Loop/loop.reducer';
import wordBagReducer from './WordBag/wordbag.reducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localReducer from './Local/local.reducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['bookmarks'],
};

export default combineReducers({
  loop: loopReducer,
  wordBagReducer: wordBagReducer,
  localReducer: persistReducer(persistConfig, localReducer),
});
