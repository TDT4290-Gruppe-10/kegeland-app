import React from 'react';
import {ScrollView} from 'react-native';

import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

import BluetoothDeviceItem from './BluetoothDeviceItem';

export type BluetoothDeviceListProps = {
  devices: BluetoothDevice[];
  connect: (id: string) => void;
};

const BluetoothDeviceList: React.FC<BluetoothDeviceListProps> = ({
  devices,
  connect,
}) => {
  return (
    <ScrollView>
      {devices.map((device) => (
        <BluetoothDeviceItem
          key={device.id}
          device={device}
          connect={connect}
        />
      ))}
    </ScrollView>
  );
};

export default BluetoothDeviceList;
