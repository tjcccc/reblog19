import { SIGN_IN, SIGN_OUT, CHECK } from './actionTypes';
import levels from '../../config/levels';

const initialState = {
  isSignedIn: false,
  isAdmin: false,
  login: {
    userId: '',
    userLevel: -1,
    isLoginSuccessful: false,
    loginTime: null,
    token: '',
    tokenExpiration: 0
  },
  result: {
    userId: '',
    userLevel: -1,
    isLoginSuccessful: false,
    loginTime: null
  }
}

export default (state = initialState, action) => {
  const { login, result } = action;
  switch (action.type) {
    case SIGN_IN: {
      return {
        isSignedIn: login.isLoginSuccessful,
        isAdmin: login.userLevel === levels.adminLevel,
        login
      };
    }
    case SIGN_OUT: {
      return state;
    }
    case CHECK: {
      return {
        isSignedIn: result.isLoginSuccessful,
        isAdmin: result.userLevel === levels.adminLevel,
        result
      }
    }
    default: {
      return state;
    }
  }
}
