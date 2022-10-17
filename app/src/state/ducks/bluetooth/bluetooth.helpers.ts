import {PayloadAction} from '@reduxjs/toolkit';
import {findKey} from 'lodash';

import {BluetoothDevice, BluetoothState} from './bluetooth.interface';
import {orderDevicesByState} from './bluetooth.utils';

export const addAvailableDeviceReducer = (
  state: BluetoothState,
  action: PayloadAction<BluetoothDevice>,
) => {
  const deviceId = action.payload.id;
  if (
    !(deviceId in state.connectedDevices || deviceId in state.availableDevices)
  ) {
    state.availableDevices[deviceId] = action.payload;
  }
};

export const connectDeviceReducer = (
  state: BluetoothState,
  action: PayloadAction<void, string, {arg: string}>,
) => {
  const deviceId = action.meta.arg;
  if (deviceId in state.availableDevices) {
    state.availableDevices[deviceId].state = 'connected';
    const device = state.availableDevices[deviceId];
    state.connectedDevices[deviceId] = device;
    state.availableDevices = orderDevicesByState(state.availableDevices);
  }
  if (deviceId in state.connectedDevices) {
    state.connectedDevices[deviceId].state = 'connected';
  }
};

export const disconnectDeviceReducer = (
  state: BluetoothState,
  action: PayloadAction<string>,
) => {
  const deviceId = action.payload;
  if (deviceId in state.availableDevices) {
    delete state.availableDevices[deviceId].battery;
    state.availableDevices[deviceId].state = 'available';
    state.availableDevices = orderDevicesByState(state.availableDevices);
  }
  const housekeepingUUID = findKey(
    state.housekeepers,
    (val) => val === deviceId,
  );
  if (housekeepingUUID) {
    delete state.housekeepers[housekeepingUUID];
  }
  delete state.connectedDevices[deviceId];
};
