import { combineReducers } from 'redux';
import user from './user';
import layout from './layout';
import cart from './cart';

const rootReducer = combineReducers({
  user,
  layout,
  cart,
});

export default rootReducer;
