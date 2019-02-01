/*----------  Vendor Imports  ----------*/
import { createStore, applyMiddleware, compose } from 'redux';

/*----------  Custom Imports  ----------*/
import rootReducer from './ducks';
import apiMiddleware from './middleware/core/api';
import userMiddleware from './middleware/feature/user';

/*----------  Setup  ----------*/
// Get the DevTools : https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*----------  Define & order Middleware  ----------*/
const featureMiddleware = [
  userMiddleware,
];
const coreMiddleware = [
  apiMiddleware,
];

/*----------  Build Enhancer  ----------*/
const enhancer = composeEnhancers(
  applyMiddleware(
    ...featureMiddleware,
    ...coreMiddleware,
  ),
);

/*----------  Create Store  ----------*/
const store = createStore(
  rootReducer,                   // The Reducer
  {},                            // The Empty Starting State
  enhancer                       // The Enhancer
);

// Export Store
export default store;
