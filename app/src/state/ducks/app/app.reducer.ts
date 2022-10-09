import {createSlice} from '@reduxjs/toolkit';

import {updateSetting} from './app.actions';
import {AppState} from './app.interface';

const initialState: AppState = {
  anchorRoute: undefined,
  settings: {
    darkMode: false,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAnchorRoute: (state, action) => {
      state.anchorRoute = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSetting, (state, action) => {
      const {key, value} = action.payload;
      state.settings[key] = value;
    });
  },
});

export const {setAnchorRoute} = settingsSlice.actions;

export default settingsSlice.reducer;
