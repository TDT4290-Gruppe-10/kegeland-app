import {createAsyncThunk} from '@reduxjs/toolkit';

import {Token} from '~constants/auth';
import {apiCaller} from '~utils/apiCaller';
import {
  removeTokens,
  retrieveToken,
  retrieveTokens,
  storeTokens,
} from '~utils/storage';

import {allTokensExist} from './auth.helpers';
import {
  LoginDTO,
  LoginResponse,
  RefreshResponse,
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
    apiCaller<LoginResponse>({url: 'auth/login', method: 'POST', data}).then(
      async (res) => {
        await storeTokens(res.tokens);
        return res;
      },
    ),
);

export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
  try {
    const res = await apiCaller<void>({
      url: 'auth/logout',
      method: 'POST',
    });
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
    apiCaller<RegisterResponse>({
      url: 'auth/register',
      method: 'POST',
      data,
    }).then(async (res) => {
      await storeTokens(res.tokens);
      return res;
    }),
);

export const silentRefresh = createAsyncThunk(
  'auth/silentRefresh',
  async () => {
    const token = await retrieveToken(Token.REFRESH_TOKEN);
    if (!token) {
      throw new Error('No refresh token found');
    }
    await apiCaller<RefreshResponse>({
      url: 'auth/refresh',
      method: 'POST',
      data: {
        refreshToken: token,
      },
    }).then(async (res) => storeTokens(res));
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordDTO) => {
    apiCaller<void>({url: 'auth/reset', method: 'POST', data});
  },
);
