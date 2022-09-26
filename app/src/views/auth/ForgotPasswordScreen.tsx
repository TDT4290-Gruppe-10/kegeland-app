import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';

import {AuthScreenProps} from '~routes/interface';

const ForgotPasswordScreen: React.FC<
  AuthScreenProps<'Forgot password'>
> = () => {
  return (
    <SafeAreaView>
      <Text>Forgot Password Screen</Text>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
