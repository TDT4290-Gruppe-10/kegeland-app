import React from 'react';
import {
  KeyboardAvoidingViewProps,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const AvoidKeyboard: React.FC<KeyboardAvoidingViewProps> = ({
  children,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default AvoidKeyboard;
