import {PayloadAction} from '@reduxjs/toolkit';

import {AppSettings, SettingsProperty} from './app.interface';

export function updateSetting<T extends keyof AppSettings>(
  payload: SettingsProperty<T>,
): PayloadAction<SettingsProperty<T>> {
  return {
    type: 'updateSetting',
    payload,
  };
}
updateSetting.type = 'updateSetting';
