import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SettingsState} from './settings.interface';

const initialState: SettingsState = {
  isDarkMode: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {setDarkMode} = settingsSlice.actions;

export default settingsSlice.reducer;
