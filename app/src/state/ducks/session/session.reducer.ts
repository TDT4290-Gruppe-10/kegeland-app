import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '~utils/thunkUtils';

import {ExerciseSession, SessionState} from './session.interface';

const initialState: SessionState = {
  loading: false,
  error: undefined,
  session: undefined,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (
      state: SessionState,
      action: PayloadAction<ExerciseSession | undefined>,
    ) => {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => isPendingAction(action, 'questions'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'questions'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'questions'),
        (state, {error}) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const {setSession} = sessionSlice.actions;

export default sessionSlice.reducer;
