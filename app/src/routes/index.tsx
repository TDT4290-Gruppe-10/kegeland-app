import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import withThemedNavigation from '~hoc/withThemedNavigation';
import HomeScreen from '~views/HomeScreen';

import AuthRoutes from './AuthRoutes';
import {RootTabParamList} from './interface';
import SettingsRoutes from './SettingsRoutes';

const tabIcons: Record<keyof RootTabParamList, string> = {
  Home: 'home',
  AuthStack: 'person',
  SettingsStack: 'settings',
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const Router: React.FC<any> = (props: any) => {
  return (
    <Tab.Navigator
      {...props}
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          return <Icon name={tabIcons[route.name]} size={size} color={color} />;
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="AuthStack"
        component={AuthRoutes}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsRoutes}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const ThemedRouter = withThemedNavigation(Router);

export default ThemedRouter;
