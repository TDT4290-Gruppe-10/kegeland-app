import BleManager from 'react-native-ble-manager';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ALLOW_DUPLICATE_DEVICES, SCAN_TIME} from '@constants/bluetooth';

export const startDeviceScan = createAsyncThunk(
  'bluetooth/scanForDevices',
  async (serviceUUIDs: string[]) =>
    BleManager.scan(serviceUUIDs, SCAN_TIME, ALLOW_DUPLICATE_DEVICES),
);

export const connectDevice = createAsyncThunk(
  'bluetooth/connectDevice',
  async (id: string) => BleManager.connect(id),
);

export {};
