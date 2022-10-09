import {PayloadAction} from '@reduxjs/toolkit';
import {every, values} from 'lodash';

import {Token} from '~constants/auth';

import {AuthState, LoginResponse} from './auth.interface';

export const allTokensExist = (tokens: Record<Token, string>): boolean => {
  const tokenKeys = values(Token);
  return every(
    Object.entries(tokens),
    ([key, val]) => tokenKeys.includes(key as Token) && val !== null,
  );
};

export const signInReducer = (
  state: AuthState,
  action: PayloadAction<LoginResponse>,
) => {
  const {id, email} = action.payload;
  state.isSignedIn = true;
  state.authUser = {id, email};
  state.userDetails = action.payload.details;
};

export const signOutReducer = (state: AuthState) => {
  state.isSignedIn = false;
  state.authUser = undefined;
  state.userDetails = undefined;
};
