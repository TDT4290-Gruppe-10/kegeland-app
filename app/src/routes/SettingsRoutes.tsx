import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ConnectDeviceScreen from '~views/settings/ConnectDeviceScreen';
import SettingsScreen from '~views/settings/SettingsScreen';

import {SettingsStackParamList} from './interface';

export const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsRoutes: React.FC = () => {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen
        name="Connect device"
        component={ConnectDeviceScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsRoutes;
