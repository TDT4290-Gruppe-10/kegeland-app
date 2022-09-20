import React from 'react';
import {ListItem, Text} from '@rneui/themed';
import {BluetoothDevice} from '@state/ducks/bluetooth/bluetooth.interface';

export type BluetoothDeviceItemProps = {
  device: BluetoothDevice;
  connect: (id: string) => void;
};

const BluetoothDeviceItem: React.FC<BluetoothDeviceItemProps> = ({
  device,
  connect,
}) => {
  const {id, name, state} = device;

  return (
    <ListItem onLongPress={() => connect(id)}>
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{id}</ListItem.Subtitle>
        <Text>{state}</Text>
      </ListItem.Content>
    </ListItem>
  );
};

export default BluetoothDeviceItem;
