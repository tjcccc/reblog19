import { SIGN_IN, SIGN_OUT, CHECK } from './actionTypes';

export const signIn = (loginData) => ({
  type: SIGN_IN,
  login: loginData
});

export const signOut = () => ({
  type: SIGN_OUT
});

export const check = (result) => ({
  type: CHECK,
  result: result
})
