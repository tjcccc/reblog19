import { SIGN_IN, SIGN_OUT, CHECK } from './actionTypes';
import levels from '../../config/levels';

const initialState = {
  isAccountChecked: false,
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
        isAccountChecked: true,
        isSignedIn: login.isLoginSuccessful,
        isAdmin: login.userLevel === levels.adminLevel,
        login
      };
    }
    case SIGN_OUT: {
      return {
        isAccountChecked: true,
        isSignedIn: false,
        isAdmin: false
      };
    }
    case CHECK: {
      return {
        isAccountChecked: true,
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
