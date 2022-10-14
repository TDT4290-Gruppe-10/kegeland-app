import FEMFIT_PROFILE from '~lib/femfit/bluetooth/profile';

import {BluetoothProfile} from './interface';

export const SCAN_TIME = 5;
export const ALLOW_DUPLICATE_DEVICES = false;
export const UPDATE_INTERVAL_MS = 250;

export const BLE_PROFILES: Record<string, BluetoothProfile> = {
  femfit: FEMFIT_PROFILE,
};

export const PERIPHERAL_MAP: Record<string, string> = {
  [FEMFIT_PROFILE.batteryService.service.uuid]: 'femfit',
};

export type ProfileKey = keyof typeof BLE_PROFILES;
