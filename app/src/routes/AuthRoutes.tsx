import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ForgotPasswordScreen from '~views/auth/ForgotPasswordScreen';
import LoginScreen from '~views/auth/LoginScreen';
import RegisterScreen from '~views/auth/RegisterScreen';

import {AuthStackParamList} from './interface';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen
        name="Forgot password"
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
