import {PayloadAction} from '@reduxjs/toolkit';
import {forEach, reduce, merge, size, capitalize} from 'lodash';

import {ProfileKey} from '~constants/bluetooth';
import {getCharacteristics, getProfile} from '~utils/bluetooth';

import {
  BatchedDeviceCharacteristics,
  BluetoothDevice,
  BluetoothState,
  DeviceCharacteristics,
  ValidPeripheral,
} from './bluetooth.interface';
import {orderDevicesByState} from './bluetooth.utils';

export const batchTransformByteData = (
  data: DeviceCharacteristics,
  profileKey: ProfileKey,
) => {
  const profile = getProfile(profileKey);
  forEach(data, (val, key) => {
    data[key] = profile.handlers[key](val);
  });
  return data;
};

export const batchUpdateCharacteristics = (
  devices: Record<string, BluetoothDevice>,
  data: BatchedDeviceCharacteristics,
) => {
  forEach(data, (value, key) => {
    const profileKey = devices[key].type;
    merge(
      devices[key].characteristics,
      batchTransformByteData(value, profileKey),
    );
  });
  return devices;
};

export const addAvailableDeviceReducer = (
  state: BluetoothState,
  action: PayloadAction<ValidPeripheral>,
) => {
  const deviceId = action.payload.id;
  if (
    !(deviceId in state.connectedDevices || deviceId in state.availableDevices)
  ) {
    const {id, rssi, type} = action.payload;
    state.availableDevices[deviceId] = {
      id,
      name: capitalize(type),
      rssi,
      type,
      active: false,
      state: 'available',
      characteristics: {},
    };
  }
};

export const connectDeviceReducer = (
  state: BluetoothState,
  action: PayloadAction<void, string, {arg: string}>,
) => {
  const deviceId = action.meta.arg;
  state.availableDevices[deviceId].state = 'connected';

  const device = state.availableDevices[deviceId];
  device.characteristics = reduce(
    getCharacteristics(device.type),
    (prev, curr) => {
      prev[curr] = [];
      return prev;
    },
    {} as DeviceCharacteristics,
  );
  state.connectedDevices[deviceId] = device;
  state.availableDevices = orderDevicesByState(state.availableDevices);
};

export const deviceDisconnectedReducer = (
  state: BluetoothState,
  action: PayloadAction<string>,
) => {
  const deviceId = action.payload;
  const device = state.connectedDevices[deviceId];
  if (size(state.availableDevices) > 0) {
    device.state = 'available';
    state.availableDevices[deviceId] = device;
    state.availableDevices = orderDevicesByState(state.availableDevices);
  }
  delete state.connectedDevices[deviceId];
};
