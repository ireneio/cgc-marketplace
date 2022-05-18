import { combineReducers } from 'redux';
import user from './user';
import layout from './layout';

const rootReducer = combineReducers({
  user,
  layout,
});

export default rootReducer;
