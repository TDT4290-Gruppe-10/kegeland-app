import React from 'react';
import {Control, Controller, FormState} from 'react-hook-form';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

export type FormInputProps = {
  state: FormState<any>;
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
};

const FormInput: React.FC<FormInputProps> = (props) => {
  const {errors} = props.state;
  const hasErrors = errors[props.name] !== undefined;
  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={null}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.inputField}>
          <TextInput
            mode="outlined"
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            returnKeyType="next"
            error={hasErrors}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
          <HelperText type="error" visible={hasErrors}>
            {hasErrors && (errors[props.name]!.message as string)}
          </HelperText>
        </View>
      )}
    />
  );
};

FormInput.defaultProps = {
  keyboardType: 'default',
};

const styles = StyleSheet.create({
  inputField: {
    marginTop: 5,
  },
});

export default FormInput;
