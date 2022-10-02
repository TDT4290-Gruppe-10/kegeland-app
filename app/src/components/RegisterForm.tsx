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

import {
  ERROR_MESSAGES,
  REGEX,
  PASSWORD_MIN_LENGTH,
} from '~constants/userForm/userFields';
import useAppDispatch from '~hooks/useAppDispatch';
import {signUpUser} from '~state/ducks/auth/auth.actions';
import {UserRole} from '~constants/auth';
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const submitForm = (data: FormData) => {
    const {email, password} = data;
    dispatch(signUpUser({email, password, roles: [UserRole.PATIENT]}));
  };

  return (
    <ScrollView style={styles.mainBody}>
      <View style={{alignSelf: 'center', width: '85%'}}>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <Controller
              control={control}
              defaultValue=""
              name="name"
              rules={{
                required: {message: ERROR_MESSAGES.REQUIRED, value: true},
                pattern: {
                  value: REGEX.personalName,
                  message: ERROR_MESSAGES.NAME_INVALID,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    theme={{
                      colors: {primary: '#D25660', placeholder: '#8b9cb5'},
                    }}
                    style={styles.inputStyle}
                    mode="outlined"
                    placeholder="Enter Name"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onChangeText={(e) => onChange(e)}
                    blurOnSubmit={false}
                    value={value}
                    onBlur={onBlur}
                  />
                  <HelperText type="error">{errors.name?.message}</HelperText>
                </>
              )}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Controller
              control={control}
              defaultValue=""
              name="email"
              rules={{
                required: {
                  message: ERROR_MESSAGES.REQUIRED,
                  value: true,
                },
                pattern: {
                  value: REGEX.email,
                  message: ERROR_MESSAGES.EMAIL_INVALID,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    theme={{
                      colors: {primary: '#D25660', placeholder: '#8b9cb5'},
                    }}
                    style={styles.inputStyle}
                    mode="outlined"
                    underlineColorAndroid="#f000"
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="email-address"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onChangeText={(e) => onChange(e)}
                    value={value}
                    onBlur={onBlur}
                  />
                  <HelperText type="error">{errors.email?.message}</HelperText>
                </>
              )}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Controller
              control={control}
              defaultValue=""
              name="password"
              rules={{
                required: {message: ERROR_MESSAGES.REQUIRED, value: true},
                minLength: {
                  value: PASSWORD_MIN_LENGTH,
                  message: 'Password must have at least 6 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    theme={{
                      colors: {primary: '#D25660', placeholder: '#8b9cb5'},
                    }}
                    style={styles.inputStyle}
                    mode="outlined"
                    underlineColorAndroid="#f000"
                    placeholder="Enter Password"
                    placeholderTextColor="#8b9cb5"
                    value={value}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={(e) => onChange(e)}
                  />
                  <HelperText type="error">
                    {errors.password?.message}
                  </HelperText>
                </>
              )}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Controller
              control={control}
              defaultValue=""
              name="confirmPassword"
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
                    underlineColorAndroid="#f000"
                    placeholder="Confirm Password"
                    placeholderTextColor="#8b9cb5"
                    returnKeyType="next"
                    secureTextEntry={true}
                    blurOnSubmit={false}
                    onChangeText={(e) => onChange(e)}
                    value={value}
                    onBlur={onBlur}
                    autoCapitalize="none"
                  />
                  <HelperText type="error">
                    {errors.confirmPassword?.message}
                  </HelperText>
                </>
              )}
            />
          </View>

          <Button
            mode="contained"
            style={styles.containerStyle}
            onPress={handleSubmit(submitForm)}
            // disabled={!formState.isValid}
            uppercase={false}>
            <Text style={{fontSize: 16}}>Register</Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default RegisterForm;

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
  buttonStyle: {
    backgroundColor: '#D25660',
    borderRadius: 5,
  },
  containerStyle: {
    width: 230,
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: '#D25660',
  },
  inputStyle: {
    fontSize: 14,
    height: 35,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
