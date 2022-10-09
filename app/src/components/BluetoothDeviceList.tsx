import React from 'react';
import {List} from 'react-native-paper';

import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

import BluetoothDeviceItem from './BluetoothDeviceItem';
import ListItemSkeleton from './ListItemSkeleton';

type BluetoothDeviceListProps = {
  devices: BluetoothDevice[];
};

const BluetoothDeviceList: React.FC<BluetoothDeviceListProps> = ({devices}) => {
  return (
    <List.Section>
      {devices.length > 0
        ? devices.map((device) => (
            <BluetoothDeviceItem key={device.id} device={device} />
          ))
        : Array.from({length: 3}, (_v, i) => <ListItemSkeleton key={i} />)}
    </List.Section>
  );
};

export default BluetoothDeviceList;
