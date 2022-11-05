import BleManager from 'react-native-ble-manager';

import * as constants from '~constants/bluetooth';
import {store} from '~state/store';
import {getAllServiceIds} from '~utils/bluetooth';

import {
  connectDevice,
  disconnectDevice,
  forceStopDeviceScan,
  startDeviceScan,
} from '../bluetooth.actions';

describe('Test bluetooth-actions', () => {
  it('startDeviceScan should initiate peripheral scan on success', async () => {
    const scanSpy = jest
      .spyOn(BleManager, 'scan')
      .mockImplementation(() => Promise.resolve());
    store.dispatch(startDeviceScan());
    expect(scanSpy).toBeCalledWith(
      getAllServiceIds(),
      constants.SCAN_TIME,
      constants.ALLOW_DUPLICATE_DEVICES,
    );
  });
  it('startDeviceScan should fail on error', async () => {
    jest
      .spyOn(BleManager, 'scan')
      .mockImplementation(() => Promise.reject(new Error()));
    const res = await store.dispatch(startDeviceScan());
    expect(res.type).toBe(startDeviceScan.rejected.type);
  });

  it('forceStopDeviceScan should stop peripheral scan', async () => {
    const scanSpy = jest
      .spyOn(BleManager, 'stopScan')
      .mockImplementation(() => Promise.resolve());
    await store.dispatch(forceStopDeviceScan());
    expect(scanSpy).toBeCalled();
  });

  it("connectDevice should connect to the device and retrieve it's services on success", async () => {
    const connectSpy = jest
      .spyOn(BleManager, 'connect')
      .mockImplementation(() => Promise.resolve());
    const serviceSpy = jest
      .spyOn(BleManager, 'retrieveServices')
      .mockImplementation(() =>
        Promise.resolve({id: deviceId, advertising: {}, rssi: -123}),
      );
    const deviceId = 'fs:32:sa:43';
    await store.dispatch(connectDevice(deviceId));
    expect(connectSpy).toBeCalledWith(deviceId);
    expect(serviceSpy).toBeCalledWith(deviceId);
  });

  it('connectDevice should fail on error', async () => {
    jest
      .spyOn(BleManager, 'connect')
      .mockImplementation(() => Promise.reject(new Error()));
    const deviceId = 'fs:32:sa:43';
    const res = await store.dispatch(connectDevice(deviceId));
    expect(res.type).toBe(connectDevice.rejected.type);
  });

  it('disconnectDevice should connect to device on success', async () => {
    const disconnectSpy = jest
      .spyOn(BleManager, 'disconnect')
      .mockImplementation(() => Promise.resolve());
    const deviceId = 'fs:32:sa:43';
    await store.dispatch(disconnectDevice(deviceId));
    expect(disconnectSpy).toBeCalledWith(deviceId);
  });

  it('disconnectDevice should retry once on initial fail', async () => {
    const disconnectSpy = jest
      .spyOn(BleManager, 'disconnect')
      .mockImplementation(() => Promise.reject(new Error()));
    const deviceId = 'fs:32:sa:43';
    await store.dispatch(disconnectDevice(deviceId));
    expect(disconnectSpy).toBeCalledTimes(2);
  });

  it('disconnectDevice should fail on error', async () => {
    jest
      .spyOn(BleManager, 'disconnect')
      .mockImplementation(() => Promise.reject(new Error()));
    const deviceId = 'fs:32:sa:43';
    const res = await store.dispatch(disconnectDevice(deviceId));
    expect(res.type).toBe(disconnectDevice.rejected.type);
  });
});
