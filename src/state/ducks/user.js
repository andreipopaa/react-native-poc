// Namespace
export const USER = '[user]';

// Actions
export const SET_USER = `${USER} SET_USER`;
export const SET_ERROR = `${USER} SET_ERROR`;
export const LOGIN = `${USER} LOGIN`;
export const NAME = `${USER} NAME`;
export const PASSWORD = `${USER} PASSWORD`;
export const SIGN_OUT = `${USER} SIGN_OUT`;
export const RESET = `${USER} RESET`

// Action Creators
export const setUser = ({ email, cookieName, cookieValue }) => ({
  type: SET_USER,
  email,
  cookieName,
  cookieValue,
});

export const resetUser = () => ({
  type: RESET,
});

export const setError = error => ({
  type: SET_ERROR,
  error,
});

export const loginUser = () => ({
  type: LOGIN,
});

export const setName = name => ({
  type: NAME,
  name,
});

export const setPassword = password => ({
  type: PASSWORD,
  password,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

// Initial State
const INITIAL_USER_STATE = {
  email: '',
  cookieName: '',
  cookieValue: '',
  name: '',
  password: '',
  error: '',
};

// Login Reducer
export default function userReducer(state = INITIAL_USER_STATE, action) {

  switch(action.type) {

    case SET_USER:
      return Object.assign({}, state, {
        email: action.email,
        cookieName: action.cookieName,
        cookieValue: action.cookieValue,
      });

    case SET_ERROR: 
      return Object.assign({}, state, {
        error: action.error,
      });

    case NAME:
      return Object.assign({}, state, {
        name: action.name,
      });

    case PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });

    case RESET:
      return Object.assign({}, state, {
        email: '',
        cookieName: '',
        cookieValue: '',
      });

    default:
      return state;

  }
}
