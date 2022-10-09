import BleManager from 'react-native-ble-manager';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  ALLOW_DUPLICATE_DEVICES,
  BLE_PROFILES,
  ProfileKey,
  SCAN_TIME,
} from '~constants/bluetooth';
import {getAllServiceIds} from '~utils/bluetooth';

export const startNotification = createAsyncThunk(
  'bluetooth/startNotification',
  async ({id, profileKey}: {id: string; profileKey: ProfileKey}) => {
    try {
      const profile = BLE_PROFILES[profileKey];
      for (const [service, chars] of Object.entries(profile.notifyChannels)) {
        for (const char of chars) {
          await BleManager.startNotification(id, service, char);
        }
      }
    } catch {
      throw new Error(`Failed to start notifications for device '${id}'`);
    }
  },
);

export const stopNotification = createAsyncThunk(
  'bluetooth/stopNotification',
  async ({id, profileKey}: {id: string; profileKey: ProfileKey}) => {
    try {
      const profile = BLE_PROFILES[profileKey];
      for (const [service, chars] of Object.entries(profile.notifyChannels)) {
        for (const char of chars) {
          await BleManager.stopNotification(id, service, char);
        }
      }
    } catch {
      throw new Error(`Failed to stop notifications for device '${id}'`);
    }
  },
);

export const startDeviceScan = createAsyncThunk(
  'bluetooth/scanForDevices',
  async () =>
    BleManager.scan(
      getAllServiceIds(),
      SCAN_TIME,
      ALLOW_DUPLICATE_DEVICES,
    ).catch(() => {
      throw new Error('Failed to start the scan');
    }),
);

export const forceStopDeviceScan = createAsyncThunk(
  'bluetooth/forceStopScan',
  async () => {
    BleManager.stopScan();
  },
);

export const connectDevice = createAsyncThunk(
  'bluetooth/connectDevice',
  async (id: string) =>
    BleManager.connect(id).catch(() => {
      throw new Error(`Failed to connect to device '${id}'`);
    }),
);

export const disconnectDevice = createAsyncThunk(
  'bluetooth/disconnectDevice',
  async (id: string) =>
    BleManager.disconnect(id)
      .catch(() => BleManager.disconnect(id, true))
      .catch(() => {
        throw new Error(`Failed to disconnect device '${id}'`);
      }),
);
