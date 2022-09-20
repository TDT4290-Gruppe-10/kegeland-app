import * as React from 'react';
import {Button} from '@rneui/themed';
import useAppDispatch from '@hooks/useAppDispatch';
import {
  connectDevice,
  startDeviceScan,
} from '@state/ducks/bluetooth/bluetooth.actions';
import useAppSelector from '@hooks/useAppSelector';
import BluetoothDeviceList from '@components/BluetoothDeviceList';
import {useCallback} from 'react';
import {View} from 'react-native';

const ConnectDeviceContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const {devices} = useAppSelector((state) => state.bluetooth);

  const connect = useCallback(
    (id: string) => dispatch(connectDevice(id)),
    [dispatch],
  );
  return (
    <View>
      <Button title="scan" onPress={() => dispatch(startDeviceScan([]))} />
      <BluetoothDeviceList devices={Object.values(devices)} connect={connect} />
    </View>
  );
};

export default ConnectDeviceContainer;
