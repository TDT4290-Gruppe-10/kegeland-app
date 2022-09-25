import React from 'react';
import {Text} from 'react-native-paper';

import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

export type BluetoothDeviceItemProps = {
  device: BluetoothDevice;
  connect: (id: string) => void;
  disconnect: (id: string) => void;
};

const BluetoothDeviceItem: React.FC<BluetoothDeviceItemProps> = ({device}) => {
  const {name} = device;

  return <Text>{name}</Text>;
};

export default BluetoothDeviceItem;
