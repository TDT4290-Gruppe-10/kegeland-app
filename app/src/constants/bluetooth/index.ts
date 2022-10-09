import * as femfit from './peripherals/femfit';

import {BluetoothProfile} from './interface';

export const SCAN_TIME = 5;
export const ALLOW_DUPLICATE_DEVICES = false;
export const UPDATE_INTERVAL_MS = 500;

export const BLE_PROFILES: Record<string, BluetoothProfile> = {
  femfit: femfit.PROFILE,
};

export const PERIPHERAL_MAP: Record<string, string> = {
  [femfit.SERVICES.HOUSEKEEPING_SERVICE]: 'femfit',
};

export type ProfileKey = keyof typeof BLE_PROFILES;
