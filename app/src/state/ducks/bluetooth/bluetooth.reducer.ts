import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {isPendingAction, isRejectedAction} from '~utils/thunkUtils';

import {
  connectDevice,
  disconnectDevice,
  startDeviceScan,
  startNotification,
  stopNotification,
} from './bluetooth.actions';
import {
  addAvailableDeviceReducer,
  batchUpdateCharacteristics,
  connectDeviceReducer,
  deviceDisconnectedReducer,
} from './bluetooth.helpers';
import {
  BatchedDeviceCharacteristics,
  BluetoothState,
} from './bluetooth.interface';

const initialState: BluetoothState = {
  isReady: false,
  isScanning: false,
  connectedDevices: {},
  availableDevices: {},
  error: undefined,
};

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    setReady: (state) => {
      state.isReady = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    stopDeviceScan: (state) => {
      state.isScanning = false;
    },
    deviceDisconnected: deviceDisconnectedReducer,
    addAvailableDevice: addAvailableDeviceReducer,
    clearAvailableDevices: (state) => {
      state.availableDevices = {};
    },
    updateCharacteristics: (
      state,
      action: PayloadAction<BatchedDeviceCharacteristics>,
    ) => {
      state.connectedDevices = batchUpdateCharacteristics(
        state.connectedDevices,
        action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startDeviceScan.rejected, (state, {error}) => {
        state.isScanning = false;
        state.error = error.message;
      })
      .addCase(startDeviceScan.fulfilled, (state) => {
        state.isScanning = true;
      })
      .addCase(connectDevice.pending, (state, action) => {
        state.availableDevices[action.meta.arg].state = 'connecting';
      })
      .addCase(connectDevice.rejected, (state, action) => {
        state.availableDevices[action.meta.arg].state = 'available';
      })
      .addCase(connectDevice.fulfilled, connectDeviceReducer)
      .addCase(disconnectDevice.pending, (state, action) => {
        state.connectedDevices[action.meta.arg].state = 'disconnecting';
      })
      .addCase(startNotification.fulfilled, (state, action) => {
        state.connectedDevices[action.meta.arg.id].active = true;
      })
      .addCase(stopNotification.fulfilled, (state, action) => {
        state.connectedDevices[action.meta.arg.id].active = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.error = undefined;
      })
      .addMatcher(isRejectedAction, (state, {error}) => {
        state.error = error.message;
      });
  },
});

export const {
  setReady,
  setError,
  stopDeviceScan,
  deviceDisconnected,
  addAvailableDevice,
  clearAvailableDevices,
} = bluetoothSlice.actions;

export default bluetoothSlice.reducer;
