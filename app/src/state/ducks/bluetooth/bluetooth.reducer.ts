import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {connectDevice, startDeviceScan} from './bluetooth.actions';
import {BluetoothDevice, BluetoothState} from './bluetooth.interface';

const initialState: BluetoothState = {
  isReady: false,
  isScanning: false,
  isConnecting: false,
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
        state.isConnecting = true;
        const key = action.meta.arg;
        state.devices[key].state = 'connecting';
      })
      .addCase(connectDevice.rejected, (state) => {
        state.isConnecting = false;
        state.error = 'Could not connect';
      })
      .addCase(connectDevice.fulfilled, (state, action) => {
        state.isConnecting = false;
        const key = action.meta.arg;
        state.devices[key].state = 'connected';
      });
  },
});

export const {setReady, setError, stopDeviceScan, addAvailableDevice} =
  bluetoothSlice.actions;

export default bluetoothSlice.reducer;
