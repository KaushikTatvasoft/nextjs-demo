// Root Reducer
import RootReducer from './rootReducer';

// Utility Packages
import { createStore } from 'redux';

/*************************/
/****** Imports End ******/
/*************************/

export const Store = createStore(RootReducer);
