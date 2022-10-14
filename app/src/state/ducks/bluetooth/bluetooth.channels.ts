import {capitalize} from 'lodash';
import {Peripheral} from 'react-native-ble-manager';
import {END, EventChannel, eventChannel} from 'redux-saga';

import {bleManagerEmitter} from '~hooks/useBluetooth';
import {store} from '~state/store';
import {getPeripheralType} from '~utils/bluetooth';

import {BluetoothDevice} from './bluetooth.interface';

export const createDeviceStreamChannel = (): EventChannel<BluetoothDevice> =>
  eventChannel<BluetoothDevice>((emitter) => {
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (peripheral: Peripheral) => {
        const {isScanning} = store.getState().bluetooth;
        if (isScanning) {
          const type = getPeripheralType(
            peripheral.advertising.serviceUUIDs || [],
          );
          if (type && peripheral.advertising.isConnectable) {
            emitter({
              id: peripheral.id,
              name: capitalize(type),
              battery: undefined,
              type,
              state: 'available',
            });
          }
        } else {
          // Exit channel on state change
          emitter(END);
        }
      },
    );
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };
  });
