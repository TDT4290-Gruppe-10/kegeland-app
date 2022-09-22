import React from 'react';
import {ListItem, Text} from '@rneui/themed';

import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

export type BluetoothDeviceItemProps = {
  device: BluetoothDevice;
  connect: (id: string) => void;
  disconnect: (id: string) => void;
};

const BluetoothDeviceItem: React.FC<BluetoothDeviceItemProps> = ({
  device,
  connect,
  disconnect,
}) => {
  const {id, name, state} = device;

  const handlePress = () => {
    switch (state) {
      case 'connected':
        disconnect(id);
        break;
      default:
        connect(id);
    }
  };

  return (
    <ListItem delayLongPress={1000} onLongPress={() => handlePress()}>
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{id}</ListItem.Subtitle>
        <Text>{state}</Text>
      </ListItem.Content>
    </ListItem>
  );
};

export default BluetoothDeviceItem;
