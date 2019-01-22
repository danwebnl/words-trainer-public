import { combineReducers } from 'redux';
import toastsReducer from './toastsReducer';
import wordsReducer from './wordsReducer';
import userReducer from './userReducer';
import archiveReducer from './archiveReducer';

export default combineReducers({
  toastsReducer,
  wordsReducer,
  userReducer,
  archiveReducer
});
