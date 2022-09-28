import React from 'react';
import {SafeAreaView} from 'react-native';

import {SettingsScreenProps} from '~routes/interface';

const ConnectDeviceScreen: React.FC<
  SettingsScreenProps<'Connect device'>
> = () => {
  return <SafeAreaView />;
};

export default ConnectDeviceScreen;
