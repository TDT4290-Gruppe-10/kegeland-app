import {useEffect} from 'react';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import BleManager from 'react-native-ble-manager';

import {
  deviceDisconnected,
  setError,
  setReady,
  stopDeviceScan,
} from '~state/ducks/bluetooth/bluetooth.reducer';
import {ANDROID_PERMISSIONS} from '~constants/permissions';
import checkAndroidPermission from '~utils/checkAndroidPermission';

import useAppDispatch from './useAppDispatch';

const BleManagerModule = NativeModules.BleManager;
export const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

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
    dispatch(stopDeviceScan());
  };

  const handleDisconnectedPeripheral = ({peripheral}: {peripheral: string}) => {
    dispatch(deviceDisconnected(peripheral));
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

    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );

    // Verify the app's permissions
    verifyPermissions().then(() => dispatch(setReady()));

    // Remove listeners when the component is unmounted
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
    };
  }, []);

  return true;
};

export default useBluetooth;
