import {FEMFIT_PROFILE} from './peripherals/femfit';

import {BluetoothProfile} from './interface';

export const SCAN_TIME = 5;
export const ALLOW_DUPLICATE_DEVICES = false;
export const UPDATE_INTERVAL_MS = 500;

export const BLE_PROFILES: Record<string, BluetoothProfile> = {
  femfit: FEMFIT_PROFILE,
};

export type ProfileKey = keyof typeof BLE_PROFILES;
