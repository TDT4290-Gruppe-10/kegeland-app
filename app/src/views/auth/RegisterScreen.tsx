import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';

import {AuthScreenProps} from '~routes/interface';

const RegisterScreen: React.FC<AuthScreenProps<'Register'>> = () => {
  return (
    <SafeAreaView>
      <Text>Register Screen</Text>
    </SafeAreaView>
  );
};

export default RegisterScreen;
