import { SIGN_IN, SIGN_IN_AS_READER, SIGN_OUT } from './actionTypes';

const initialState = {
  isSignedIn: false,
  isAdmin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        isSignedIn: true,
        isAdmin: true
      };
    }
    case SIGN_IN_AS_READER: {
      return {
        isSignedIn: true,
        isAdmin: false
      }
    }
    case SIGN_OUT: {
      return {
        isSignedIn: false,
        isAdmin: false
      }
    }
    default: {
      return state;
    }
  }
}
