import BleManager from 'react-native-ble-manager';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ALLOW_DUPLICATE_DEVICES,
  BLE_PROFILES,
  ProfileKey,
  SCAN_TIME,
} from '~constants/bluetooth';

export const startNotification = createAsyncThunk(
  'bluetooth/startNotification',
  async ({id, profileKey}: {id: string; profileKey: ProfileKey}) => {
    const profile = BLE_PROFILES[profileKey];
    for (const [service, chars] of Object.entries(profile.notifyChannels)) {
      for (const char of chars) {
        await BleManager.startNotification(id, service, char);
      }
    }
  },
);

export const stopNotification = createAsyncThunk(
  'bluetooth/stopNotification',
  async ({id, profileKey}: {id: string; profileKey: ProfileKey}) => {
    const profile = BLE_PROFILES[profileKey];
    for (const [service, chars] of Object.entries(profile.notifyChannels)) {
      for (const char of chars) {
        await BleManager.stopNotification(id, service, char);
      }
    }
  },
);

export const startDeviceScan = createAsyncThunk(
  'bluetooth/scanForDevices',
  async (serviceUUIDs: string[]) =>
    BleManager.scan(serviceUUIDs, SCAN_TIME, ALLOW_DUPLICATE_DEVICES),
);

export const connectDevice = createAsyncThunk(
  'bluetooth/connectDevice',
  async (id: string) => BleManager.connect(id),
);

export const disconnectDevice = createAsyncThunk(
  'bluetooth/disconnectDevice',
  async (id: string) => BleManager.disconnect(id),
);
