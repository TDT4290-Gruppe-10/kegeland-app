import React from 'react';
import {capitalize} from 'lodash';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

import useAppDispatch from '~hooks/useAppDispatch';
import {
  disconnectDevice,
  connectDevice,
} from '~state/ducks/bluetooth/bluetooth.actions';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

import ListItem from './ListItem';

type BluetoothDeviceItemProps = {
  device: BluetoothDevice;
  icon?: string;
  iconSize?: number;
  iconStyle?: StyleProp<TextStyle>;
};

const BluetoothDeviceItem: React.FC<BluetoothDeviceItemProps> = ({
  device,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();

  const handlePress = () => {
    switch (device.state) {
      case 'connected':
        dispatch(disconnectDevice(device.id));
        break;
      default:
        dispatch(connectDevice(device.id));
    }
  };

  return (
    <ListItem
      title={device.name}
      onLongPress={handlePress}
      {...props}
      render={(renderProps) => (
        <Text
          {...renderProps}
          style={[styles.deviceState, {color: colors.text}]}>
          {capitalize(device.state)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  deviceState: {
    fontSize: 13,
    fontWeight: '400',
    alignSelf: 'center',
  },
});

export default BluetoothDeviceItem;
