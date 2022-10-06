import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import DeviceList from '~components/DeviceList';
import Section from '~components/Section';
import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {SettingsScreenProps} from '~routes/interface';
import {startDeviceScan} from '~state/ducks/bluetooth/bluetooth.actions';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';

const ConnectDeviceScreen: React.FC<
  SettingsScreenProps<'Connect device'>
> = () => {
  const dispatch = useAppDispatch();
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const {connectedDevices, availableDevices} = useAppSelector(
    (state) => state.bluetooth,
  );

  useEffect(() => {
    dispatch(startDeviceScan([]));
  }, []);

  useEffect(() => {
    setDevices(
      Array.prototype.concat(
        Object.values(connectedDevices),
        Object.values(availableDevices),
      ),
    );
  }, [connectedDevices, availableDevices]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Section title="Available devices">
          <DeviceList devices={devices} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConnectDeviceScreen;
