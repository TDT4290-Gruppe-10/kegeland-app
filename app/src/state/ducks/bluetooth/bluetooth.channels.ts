import {set, size} from 'lodash';
import {Peripheral} from 'react-native-ble-manager';
import {END, EventChannel, eventChannel} from 'redux-saga';

import {UPDATE_INTERVAL_MS} from '~constants/bluetooth';
import {bleManagerEmitter} from '~hooks/useBluetooth';
import {store} from '~state/store';

import {
  BatchedDeviceCharacteristics,
  DeviceNotification,
} from './bluetooth.interface';

export const createNotificationStreamChannel = (
  deviceId: string,
): EventChannel<BatchedDeviceCharacteristics> => {
  return eventChannel<BatchedDeviceCharacteristics>((emitter) => {
    let data: BatchedDeviceCharacteristics = {};
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      ({peripheral, characteristic, value}: DeviceNotification) => {
        if (peripheral === deviceId) {
          set(data, [peripheral, characteristic], value);
        }
      },
    );

    const interval = setInterval(() => {
      if (size(data) > 0) {
        emitter(data);
      }

      data = {};
    }, UPDATE_INTERVAL_MS);
    return () => {
      console.log('Closing notification stream channel');
      bleManagerEmitter.removeAllListeners(
        'BleManagerDidUpdateValueForCharacteristic',
      );
      clearInterval(interval);
    };
  });
};

export const createDeviceStreamChannel = (): EventChannel<Peripheral> =>
  eventChannel<Peripheral>((emitter) => {
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (peripheral: Peripheral) => {
        const {isScanning} = store.getState().bluetooth;
        if (isScanning) {
          if (peripheral.advertising.isConnectable) {
            emitter(peripheral);
          }
        } else {
          emitter(END);
        }
      },
    );
    return () => {
      console.log('Closing device stream channel');
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };
  });
