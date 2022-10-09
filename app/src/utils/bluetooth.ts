import {chain, keys} from 'lodash';

import {BLE_PROFILES, PERIPHERAL_MAP, ProfileKey} from '~constants/bluetooth';

export const getProfile = (key: ProfileKey) => {
  return BLE_PROFILES[key];
};

export const getAllServiceIds = () => {
  return keys(PERIPHERAL_MAP);
};

export const getPeripheralType = (serviceUUIDs: string[]) => {
  const key = chain(serviceUUIDs)
    .filter((uuid) => uuid in PERIPHERAL_MAP)
    .first()
    .value();
  return key ? PERIPHERAL_MAP[key] : undefined;
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
