import {createAsyncThunk} from '@reduxjs/toolkit';

import {apiCaller} from '~utils/apiCaller';
import {removeTokens, retrieveTokens, storeTokens} from '~utils/storage';

import {allTokensExist} from './auth.helpers';
import {
  LoginDTO,
  LoginResponse,
  RegisterDTO,
  RegisterResponse,
  ResetPasswordDTO,
} from './auth.interface';

export const initializeAuthState = createAsyncThunk<boolean>(
  'auth/initialize',
  async () => {
    const tokens = await retrieveTokens();
    return allTokensExist(tokens);
  },
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (data: LoginDTO) =>
    apiCaller<LoginResponse>('auth/login', 'POST', data).then(async (res) => {
      await storeTokens(res.tokens);
      return res;
    }),
);

export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
  try {
    const res = await apiCaller<void>('auth/logout', 'POST');
    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unknown error has occurred');
  } finally {
    await removeTokens();
  }
});

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (data: RegisterDTO) =>
    apiCaller<RegisterResponse>('auth/register', 'POST', data).then(
      async (res) => {
        await storeTokens(res.tokens);
        return res;
      },
    ),
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordDTO) => {
    apiCaller<void>('auth/reset', 'POST', data);
  },
);
