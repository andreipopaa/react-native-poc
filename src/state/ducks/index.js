/*----------  Vendor Imports  ----------*/
import { combineReducers } from 'redux';

/*----------  Custom Imports  ----------*/
import userReducer from './user';

/*----------  Build Reducer  ----------*/
const rootReducer = combineReducers({
  user: userReducer,
});

// Export
export default rootReducer;
