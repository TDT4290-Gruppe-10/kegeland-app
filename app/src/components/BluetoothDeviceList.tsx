import React from 'react';
import {ScrollView} from 'react-native';

import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

import BluetoothDeviceItem, {
  BluetoothDeviceItemProps,
} from './BluetoothDeviceItem';

export type BluetoothDeviceListProps = {
  devices: BluetoothDevice[];
} & Omit<BluetoothDeviceItemProps, 'device'>;

const BluetoothDeviceList: React.FC<BluetoothDeviceListProps> = ({
  devices,
  ...props
}) => {
  return (
    <ScrollView>
      {devices.map((device) => (
        <BluetoothDeviceItem key={device.id} device={device} {...props} />
      ))}
    </ScrollView>
  );
};

export default BluetoothDeviceList;
