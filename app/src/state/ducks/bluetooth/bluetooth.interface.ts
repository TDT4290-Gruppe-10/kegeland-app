import {Peripheral} from 'react-native-ble-manager';

import {ProfileKey} from '~constants/bluetooth';

export type DeviceConnectionState =
  | 'available'
  | 'connecting'
  | 'disconnecting'
  | 'connected';

export type CharacteristicValue = any[];

export type DeviceCharacteristics = Record<string, CharacteristicValue>;

export type BatchedDeviceCharacteristics = Record<
  string,
  DeviceCharacteristics
>;

export type ValidPeripheral = Peripheral & {
  type: string;
};

export type BluetoothDevice = {
  id: string;
  name: string;
  rssi: number;
  type: ProfileKey;
  state: DeviceConnectionState;
  active: boolean;
  characteristics: DeviceCharacteristics;
};

export interface BluetoothState {
  isReady: boolean;
  isScanning: boolean;
  connectedDevices: Record<string, BluetoothDevice>;
  availableDevices: Record<string, BluetoothDevice>;
  error: string | undefined;
}

export type DeviceNotification = {
  value: number[];
  peripheral: string;
  characteristic: string;
  service: string;
};
