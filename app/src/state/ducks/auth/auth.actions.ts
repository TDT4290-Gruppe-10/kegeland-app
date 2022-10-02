import {createAsyncThunk} from '@reduxjs/toolkit';

import {apiCaller} from '~utils/apiCaller';
import {retrieveTokens, storeTokens} from '~utils/storage';

import {allTokensExist} from './auth.helpers';
import {
  LoginDTO,
  LoginResponse,
  RegisterDTO,
  RegisterResponse,
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
