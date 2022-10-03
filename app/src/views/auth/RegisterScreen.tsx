import React from 'react';

import RegisterForm from '~components/RegisterForm';
import {AuthScreenProps} from '~routes/interface';

const RegisterScreen: React.FC<AuthScreenProps<'Register'>> = () => {
  return <RegisterForm />;
};

export default RegisterScreen;
