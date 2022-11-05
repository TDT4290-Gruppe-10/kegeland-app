import {PayloadAction} from '@reduxjs/toolkit';

import {AuthState, LoginResponse} from './auth.interface';

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
