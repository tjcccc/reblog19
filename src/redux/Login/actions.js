import { SIGN_IN, SIGN_IN_AS_READER, SIGN_OUT } from './actionTypes';

export const signIn = () => ({
  type: SIGN_IN
});

export const signInAsReader = () => ({
  type: SIGN_IN_AS_READER
});

export const signOut = () => ({
  type: SIGN_OUT
});
