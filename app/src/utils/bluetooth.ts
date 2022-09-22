import {keys} from 'lodash';

import {BLE_PROFILES, ProfileKey} from '~constants/bluetooth';

export const getProfile = (key: ProfileKey) => {
  return BLE_PROFILES[key];
};

export const getNotificationChannels = (key: ProfileKey) => {
  return keys(getProfile(key).notifyChannels);
};

export const getCharacteristics = (key: ProfileKey) => {
  return getProfile(key).characteristics;
};

export const getHandlers = (key: ProfileKey) => {
  return getProfile(key).handlers;
};
