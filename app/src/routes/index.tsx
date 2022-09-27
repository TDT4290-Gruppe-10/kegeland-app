import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '~views/HomeScreen';

import AuthRoutes from './AuthRoutes';
import {RootTabParamList} from './interface';

const tabIcons: Record<keyof RootTabParamList, string> = {
  Home: 'home',
  Auth: 'person',
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const Router: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          return <Icon name={tabIcons[route.name]} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Auth"
        component={AuthRoutes}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Router;