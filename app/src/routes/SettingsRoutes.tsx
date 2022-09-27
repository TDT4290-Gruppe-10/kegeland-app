import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {SettingsScreen} from '~views/settings/SettingsScreen';

import {SettingsStackParamList} from './interface';

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsRoutes: React.FC = () => {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsRoutes;
