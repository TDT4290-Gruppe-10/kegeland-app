import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import AppHeader from '~components/AppHeader';
import DevicesScreen from '~views/devices/DevicesScreen';
import FemfitScreen from '~views/devices/FemfitScreen';

import {DeviceStackParamList} from './interface';

const DeviceStack = createStackNavigator<DeviceStackParamList>();

const DeviceRoutes: React.FC = () => {
  return (
    <DeviceStack.Navigator
      initialRouteName="Devices"
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
        headerShown: true,
      }}>
      <DeviceStack.Screen name="Devices" component={DevicesScreen} />
      <DeviceStack.Screen name="Femfit" component={FemfitScreen} />
    </DeviceStack.Navigator>
  );
};

export default DeviceRoutes;
