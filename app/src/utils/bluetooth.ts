import {chain, keys} from 'lodash';
import {startNotification, stopNotification} from 'react-native-ble-manager';

import {BLE_PROFILES, PERIPHERAL_MAP, ProfileKey} from '~constants/bluetooth';
import {BluetoothService} from '~constants/bluetooth/interface';

export const getProfile = (key: ProfileKey) => {
  return BLE_PROFILES[key];
};

export const readPeripheralDeviceBattery = (key: ProfileKey, bytes: number[]) =>
  getProfile(key).batteryService.fn(bytes);

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

export const addServiceListener = async (
  peripheral: string,
  service: BluetoothService,
) => {
  try {
    for (const char of service.characteristics) {
      await startNotification(peripheral, service.uuid, char);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error has occurred');
  }
};

export const removeServiceListener = async (
  peripheral: string,
  service: BluetoothService,
) => {
  try {
    for (const char of service.characteristics) {
      await stopNotification(peripheral, service.uuid, char);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error has occurred');
  }
};
