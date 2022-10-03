import React from 'react';

import LoginForm from '~components/LoginForm';
import {AuthScreenProps} from '~routes/interface';

const LoginScreen: React.FC<AuthScreenProps<'Login'>> = () => {
  return <LoginForm />;
};

export default LoginScreen;
