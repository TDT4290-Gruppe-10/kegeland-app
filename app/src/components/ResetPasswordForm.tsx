import {useForm, Controller} from 'react-hook-form';
import {Button, HelperText, TextInput} from 'react-native-paper';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AuthScreenProps} from '~routes/interface';
import {ERROR_MESSAGES} from '~constants/userForm/userFields';
interface FormData {
  email: string;
}

const ResetPasswordForm: React.FC = () => {
  const {navigation} = useNavigation<AuthScreenProps<'Forgot password'>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const submitForm = (data: FormData) => {
    console.log(data);
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.mainBody}>
      <View style={{alignSelf: 'center', width: '85%'}}>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <Controller
              control={control}
              defaultValue=""
              name="email"
              rules={{
                required: {message: ERROR_MESSAGES.REQUIRED, value: true},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    theme={{
                      colors: {primary: '#D25660', placeholder: '#8b9cb5'},
                    }}
                    style={styles.inputStyle}
                    mode="outlined"
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(e) => onChange(e)}
                  />
                  <HelperText type="error">{errors.email?.message}</HelperText>
                </>
              )}
            />
          </View>

          <Button
            mode="contained"
            style={styles.containerStyle}
            onPress={handleSubmit(submitForm)}
            uppercase={false}>
            <Text style={{fontSize: 16}}>Reset Password</Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ResetPasswordForm;

const styles = StyleSheet.create({
  mainBody: {
    paddingVertical: 60,
    flex: 1,
    alignContent: 'center',
  },
  SectionStyle: {
    height: 80,
    justifyContent: 'center',
  },
  inputStyle: {
    fontSize: 14,
    height: 35,
  },
  containerStyle: {
    width: 230,
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: '#D25660',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
