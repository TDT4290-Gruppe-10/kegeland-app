import {createSlice} from '@reduxjs/toolkit';

import {registerUser, userLogin} from './auth.actions';
import {AuthState} from './auth.interface';

const initialState: AuthState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.error = 'Hoo Lee Fuk';
      })
      // register user reducer...
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Som tin wong';
      });
  },
});

export default userSlice.reducer;
