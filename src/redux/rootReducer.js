// Reducers
import user from './reducers/index';
import carts from './reducers/carts';
import orders from './reducers/orders';
import categories from './reducers/categories';

// Utility Packages
import { combineReducers } from 'redux';

/* *********************** */
/* ***** Imports End ***** */
/* *********************** */

export default combineReducers({
  user,
  carts,
  orders,
  categories
});
