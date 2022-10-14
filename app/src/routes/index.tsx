import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import withThemedNavigation from '~hoc/withThemedNavigation';
import HomeScreen from '~views/HomeScreen';

import AuthRoutes from './AuthRoutes';
import ExerciseRoutes from './ExerciseRoutes';
import {RootTabParamList} from './interface';
import SettingsRoutes from './SettingsRoutes';

const tabIcons: Record<keyof RootTabParamList, string> = {
  Home: 'home',
  AuthStack: 'person',
  ExerciseStack: 'person',
  SettingsStack: 'settings',
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const Router: React.FC<any> = (props: any) => {
  return (
    <Tab.Navigator
      {...props}
      initialRouteName="Home"
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({color, size}) => {
            return (
              <Icon name={tabIcons[route.name]} size={size} color={color} />
            );
          },
          unmountOnBlur: true,
          tabBarShowLabel: false,
          headerShown: false,
        };
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AuthStack" component={AuthRoutes} />
      <Tab.Screen
        name="ExerciseStack"
        component={ExerciseRoutes}
        options={({route}) => {
          const options: BottomTabNavigationOptions = {};
          const routeName = getFocusedRouteNameFromRoute(route) ?? null;
          if (routeName && routeName !== 'Exercises') {
            options.tabBarStyle = {display: 'none'};
          }
          return options;
        }}
      />
      <Tab.Screen name="SettingsStack" component={SettingsRoutes} />
    </Tab.Navigator>
  );
};

const ThemedRouter = withThemedNavigation(Router);

export default ThemedRouter;
