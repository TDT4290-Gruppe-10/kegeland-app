import React from 'react';
import {StyleSheet} from 'react-native';
import {HelperText} from 'react-native-paper';

export type FormErrorProps = {
  error: string | undefined;
};

const FormError: React.FC<FormErrorProps> = ({error}) => {
  return (
    <HelperText
      style={styles.formError}
      type="error"
      visible={error !== undefined}>
      {error}
    </HelperText>
  );
};

const styles = StyleSheet.create({
  formError: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default FormError;
