import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {AuthScreenProps} from '~routes/interface';

const LoginScreen: React.FC<AuthScreenProps<'Login'>> = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Login Screen</Text>

      <Button onPress={() => navigation.navigate('Register')}>Register</Button>
    </SafeAreaView>
  );
};

export default LoginScreen;
