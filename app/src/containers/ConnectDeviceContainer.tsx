import * as React from 'react';
import {useCallback, useState, useEffect} from 'react';
import {View} from 'react-native';
import {find} from 'lodash';
import {Button, Text} from 'react-native-paper';

import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import BluetoothDeviceList, {
  BluetoothDeviceListProps,
} from '~components/BluetoothDeviceList';
import {
  connectDevice,
  disconnectDevice,
  startDeviceScan,
  startNotification,
  stopNotification,
} from '~state/ducks/bluetooth/bluetooth.actions';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

const getConnectedDevice = (devices: Record<string, BluetoothDevice>) => {
  return find(
    devices,
    (device) => device.type === 'femfit' && device.state === 'connected',
  );
};

const ConnectDeviceContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const {devices} = useAppSelector((state) => state.bluetooth);
  const [device, setDevice] = useState<BluetoothDevice | undefined>(
    getConnectedDevice(devices),
  );

  useEffect(() => {
    setDevice(getConnectedDevice(devices));
  }, [devices]);

  const handlePress = (d: BluetoothDevice) => {
    switch (d.active) {
      case false:
        startNotify();
        break;
      default:
        stopNotify();
    }
  };

  const startNotify = () => {
    if (device) {
      dispatch(startNotification({id: device.id, profileKey: 'femfit'}));
    }
  };

  const stopNotify = () => {
    if (device) {
      dispatch(stopNotification({id: device.id, profileKey: 'femfit'}));
    }
  };

  const mapStateToProps: BluetoothDeviceListProps = {
    devices: Object.values(devices),
    connect: useCallback(
      (id: string) => dispatch(connectDevice(id)),
      [dispatch],
    ),
    disconnect: useCallback(
      (id: string) => dispatch(disconnectDevice(id)),
      [dispatch],
    ),
  };

  return (
    <View>
      <Button onPress={() => dispatch(startDeviceScan([]))}>Scan</Button>
      <BluetoothDeviceList {...mapStateToProps} />
      {device && (
        <View>
          <Button onPress={() => handlePress(device)}>
            {device.active ? 'Stop notify' : 'Start notify'}
          </Button>
          <Text>{JSON.stringify(device, undefined, 2)}</Text>
        </View>
      )}
    </View>
  );
};

export default ConnectDeviceContainer;
