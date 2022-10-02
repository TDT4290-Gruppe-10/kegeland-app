import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  connectDevice,
  disconnectDevice,
  startDeviceScan,
  startNotification,
  stopNotification,
} from './bluetooth.actions';
import {
  batchUpdateCharacteristics,
  initConnectedDevice,
} from './bluetooth.helpers';
import {
  BatchedDeviceCharacteristics,
  BluetoothDevice,
  BluetoothState,
} from './bluetooth.interface';

const initialState: BluetoothState = {
  isReady: false,
  isScanning: false,
  connectedDevices: {},
  availableDevices: {},
  error: null,
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
    addAvailableDevice: (state, action: PayloadAction<BluetoothDevice>) => {
      const key = action.payload.id;
      state.availableDevices[key] = action.payload;
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
      .addCase(startDeviceScan.pending, (state) => {
        state.isScanning = true;
      })
      .addCase(startDeviceScan.rejected, (state) => {
        state.isScanning = false;
        state.error = 'Could not start scanning';
      })
      .addCase(connectDevice.pending, (state, action) => {
        const key = action.meta.arg;
        state.availableDevices[key].state = 'connecting';
      })
      .addCase(connectDevice.rejected, (state, action) => {
        state.error = 'Could not connect';
        const key = action.meta.arg;
        state.availableDevices[key].state = 'available';
      })
      .addCase(connectDevice.fulfilled, (state, action) => {
        const key = action.meta.arg;
        // state.isScanning = false;
        const device = initConnectedDevice(state.availableDevices[key]);
        delete state.availableDevices[key];
        state.connectedDevices[key] = device;
      })
      .addCase(disconnectDevice.pending, (state, action) => {
        const key = action.meta.arg;
        state.connectedDevices[key].state = 'disconnecting';
      })
      .addCase(disconnectDevice.rejected, (state) => {
        state.error = 'Could not disconnect';
        // TODO: disconnect by force
      })
      .addCase(disconnectDevice.fulfilled, (state, action) => {
        const key = action.meta.arg;
        const device = state.connectedDevices[key];
        device.state = 'available';
        delete state.connectedDevices[key];
        state.availableDevices[key] = device;
      })
      .addCase(startNotification.rejected, (state) => {
        state.error = 'Could not start notification';
      })
      .addCase(startNotification.fulfilled, (state, action) => {
        const key = action.meta.arg.id;
        state.connectedDevices[key].active = true;
      })
      .addCase(stopNotification.rejected, (state) => {
        state.error = 'Could not stop notification';
      })
      .addCase(stopNotification.fulfilled, (state, action) => {
        const key = action.meta.arg.id;
        state.connectedDevices[key].active = false;
      });
  },
});

export const {setReady, setError, stopDeviceScan, addAvailableDevice} =
  bluetoothSlice.actions;

export default bluetoothSlice.reducer;
