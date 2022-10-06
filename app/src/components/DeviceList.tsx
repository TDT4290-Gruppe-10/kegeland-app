import React from 'react';
import {StyleSheet} from 'react-native';
import {List, Text, useTheme} from 'react-native-paper';

import useAppDispatch from '~hooks/useAppDispatch';
import {
  connectDevice,
  disconnectDevice,
} from '~state/ducks/bluetooth/bluetooth.actions';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';
import {capitalize} from '~utils/textUtils';

import ListItem from './ListItem';

type DeviceListItemProps = {
  device: BluetoothDevice;
};

const DeviceListItem: React.FC<DeviceListItemProps> = ({device}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const color = device.state === 'connected' ? '#00c853' : '#ffa000';

  const handlePress = () => {
    switch (device.state) {
      case 'connected':
        dispatch(disconnectDevice(device.id));
        break;
      default:
        dispatch(connectDevice(device.id));
    }
  };
  console.log(capitalize(device.state));
  return (
    <ListItem
      title={device.name}
      onLongPress={handlePress}
      icon="circle"
      iconSize={12}
      iconStyle={{color}}
      render={(props) => (
        <Text
          {...props}
          style={(styles.deviceState, {color: colors.placeholder})}>
          {capitalize(device.state)}
        </Text>
      )}
    />
  );
};

type DeviceListProps = {
  devices: BluetoothDevice[];
};

const DeviceList: React.FC<DeviceListProps> = ({devices}) => {
  return (
    <List.Section>
      {devices.map((device) => (
        <DeviceListItem key={device.id} device={device} />
      ))}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  deviceState: {alignSelf: 'center', fontSize: 12},
});

export default DeviceList;
