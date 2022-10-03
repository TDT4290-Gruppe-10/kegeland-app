import React from 'react';

import ResetPasswordForm from '~components/ResetPasswordForm';
import {AuthScreenProps} from '~routes/interface';

const ForgotPasswordScreen: React.FC<
  AuthScreenProps<'Forgot password'>
> = () => {
  return <ResetPasswordForm />;
};

export default ForgotPasswordScreen;
