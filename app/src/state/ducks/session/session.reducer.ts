import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '~utils/thunkUtils';

import {uploadSession} from './session.actions';
import {ExerciseSession, SessionState} from './session.interface';

const initialState: SessionState = {
  loading: false,
  error: undefined,
  currentSession: undefined,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (
      state: SessionState,
      action: PayloadAction<ExerciseSession | undefined>,
    ) => {
      state.currentSession = action.payload;
    },
    clearSession: (state: SessionState) => {
      state.currentSession = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadSession.fulfilled, (state, action) => {
        state.currentSession = action.payload;
      })
      .addMatcher(
        (action) => isPendingAction(action, 'session'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'session'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'session'),
        (state, {error}) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const {setSession, clearSession} = sessionSlice.actions;

export default sessionSlice.reducer;
