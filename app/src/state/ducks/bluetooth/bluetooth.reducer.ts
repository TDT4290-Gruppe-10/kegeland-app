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
  removeUnconnectedDevices,
} from './bluetooth.helpers';
import {
  BatchedDeviceCharacteristics,
  BluetoothDevice,
  BluetoothState,
} from './bluetooth.interface';

const initialState: BluetoothState = {
  isReady: false,
  isScanning: false,
  devices: {},
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
      state.devices[key] = action.payload;
    },
    updateCharacteristics: (
      state,
      action: PayloadAction<BatchedDeviceCharacteristics>,
    ) => {
      state.devices = batchUpdateCharacteristics(state.devices, action.payload);
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
        state.devices[key].state = 'connecting';
      })
      .addCase(connectDevice.rejected, (state, action) => {
        state.error = 'Could not connect';
        const key = action.meta.arg;
        state.devices[key].state = 'connecting';
      })
      .addCase(connectDevice.fulfilled, (state, action) => {
        const key = action.meta.arg;
        // state.isScanning = false;
        state.devices[key] = initConnectedDevice(state.devices[key]);
        state.devices = removeUnconnectedDevices(state.devices);
      })
      .addCase(disconnectDevice.pending, (state, action) => {
        const key = action.meta.arg;
        state.devices[key].state = 'disconnecting';
      })
      .addCase(disconnectDevice.rejected, (state) => {
        state.error = 'Could not disconnect';
        // TODO: disconnect by force
      })
      .addCase(disconnectDevice.fulfilled, (state, action) => {
        const key = action.meta.arg;
        state.devices[key].state = 'available';
      })
      .addCase(startNotification.rejected, (state) => {
        state.error = 'Could not start notification';
      })
      .addCase(startNotification.fulfilled, (state, action) => {
        const key = action.meta.arg.id;
        state.devices[key].active = true;
      })
      .addCase(stopNotification.rejected, (state) => {
        state.error = 'Could not stop notification';
      })
      .addCase(stopNotification.fulfilled, (state, action) => {
        const key = action.meta.arg.id;
        state.devices[key].active = false;
      });
  },
});

export const {setReady, setError, stopDeviceScan, addAvailableDevice} =
  bluetoothSlice.actions;

export default bluetoothSlice.reducer;
