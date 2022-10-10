import React from 'react';
import {View, Text} from 'react-native';

import useAppDispatch from '~hooks/useAppDispatch';
import {
  stopNotification,
  startNotification,
} from '~state/ducks/bluetooth/bluetooth.actions';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';
import {getMovement} from '~utils/femfit';

import Button from './Button';

type FemfitDebuggerProps = {
  device: BluetoothDevice;
};

const FemfitDebugger: React.FC<FemfitDebuggerProps> = ({device}) => {
  const dispatch = useAppDispatch();
  const toggle = () => {
    console.log(device);
    if (device.active) {
      dispatch(stopNotification({id: device!.id, profileKey: device!.type}));
    } else {
      dispatch(startNotification({id: device.id, profileKey: device.type}));
    }
  };
  console.log(Object.values(device.characteristics));
  const data = getMovement(Object.values(device.characteristics));

  return (
    <View>
      <Button onPress={() => toggle()}>
        {device.active ? 'Stop notification' : 'Start notification'}
      </Button>
      <Text>{JSON.stringify(data, undefined, 2)}</Text>
    </View>
  );
};

export default FemfitDebugger;
