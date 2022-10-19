import FEMFIT_PROFILE from '~lib/femfit/bluetooth/profile';

import {BluetoothProfile} from './interface';

export const SCAN_TIME = 5;
export const ALLOW_DUPLICATE_DEVICES = false;
export const UPDATE_INTERVAL_MS = 250;

export const _profiles = {
  femfit: FEMFIT_PROFILE,
} as const;

export type DeviceType = keyof typeof _profiles;

export const BLE_PROFILES = _profiles as Record<DeviceType, BluetoothProfile>;

export const PERIPHERAL_MAP: Record<string, DeviceType> = {
  [FEMFIT_PROFILE.batteryService.service.uuid]: 'femfit',
};
