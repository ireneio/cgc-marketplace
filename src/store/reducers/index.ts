import { combineReducers } from 'redux';
import user from './user';
import layout from './layout';
import cart from './cart';
import collection from './collection';

const rootReducer = combineReducers({
  user,
  layout,
  cart,
  collection,
});

export default rootReducer;
