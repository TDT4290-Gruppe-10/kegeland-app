import {ANDROID_PERMISSIONS} from '@constants/permissions';
import {
  addAvailableDevice,
  setError,
  setReady,
  stopDeviceScan,
} from '@state/ducks/bluetooth/bluetooth.reducer';
import checkAndroidPermission from '@utils/checkAndroidPermission';
import {useEffect} from 'react';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';

import useAppDispatch from './useAppDispatch';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

/**
 * Custom hook for initiating communication with bluetooth devices
 * @returns true
 */
const useBluetooth = () => {
  const dispatch = useAppDispatch();

  /**
   * Updates state in redux store when scan stopped
   */
  const handleStopScan = () => {
    console.log('Stopped scanning');
    dispatch(stopDeviceScan());
  };

  /**
   * Adds the discovered peripheral to redux store
   * @param peripheral the discovered peripheral
   */
  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    if (peripheral.advertising.isConnectable) {
      const {id, name, rssi} = peripheral;
      dispatch(
        addAvailableDevice({
          id,
          name: name || 'NO NAME',
          rssi,
          state: 'available',
        }),
      );
    }
  };

  /**
   * Verifies necessary permissions
   */
  const verifyPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      for (const permission of ANDROID_PERMISSIONS) {
        await checkAndroidPermission(permission);
      }
    }
  };

  useEffect(() => {
    BleManager.start({showAlert: false}).catch((err) =>
      dispatch(setError(err)),
    );

    // Add listeners
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    // Verify the app's permissions
    verifyPermissions().then(() => dispatch(setReady()));

    // Remove listeners when the component is unmounted
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
    };
  }, []);

  return true;
};

export default useBluetooth;
