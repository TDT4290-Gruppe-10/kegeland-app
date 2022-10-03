import {forEach, pickBy, reduce, merge} from 'lodash';
import {Peripheral} from 'react-native-ble-manager';

import {ProfileKey} from '~constants/bluetooth';
import {getCharacteristics, getProfile} from '~utils/bluetooth';

import {
  BatchedDeviceCharacteristics,
  BluetoothDevice,
  DeviceCharacteristics,
} from './bluetooth.interface';

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

export const removeUnconnectedDevices = (
  devices: Record<string, BluetoothDevice>,
) => {
  return pickBy(devices, (device) => device.state === 'connected') as Record<
    string,
    BluetoothDevice
  >;
};

export const initDevice = (
  peripheral: Peripheral,
  deviceType: string,
): BluetoothDevice => {
  const {id, name, rssi} = peripheral;
  return {
    id,
    name: name || 'NO NAME',
    rssi,
    type: deviceType,
    active: false,
    state: 'available',
    characteristics: {},
  };
};

export const initConnectedDevice = (device: BluetoothDevice) => {
  device.state = 'connected';
  device.characteristics = reduce(
    getCharacteristics(device.type),
    (prev, curr) => {
      prev[curr] = [];
      return prev;
    },
    {} as DeviceCharacteristics,
  );
  return device;
};
