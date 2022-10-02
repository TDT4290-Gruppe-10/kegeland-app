// import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {Button, HelperText, TextInput} from 'react-native-paper';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {AuthStackParamList} from '~routes/interface';
import {
  ERROR_MESSAGES,
  REGEX,
  PASSWORD_MIN_LENGTH,
} from '~constants/userForm/userFields';
import useAppDispatch from '~hooks/useAppDispatch';
import {signInUser} from '~state/ducks/auth/auth.actions';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const nav = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const submitForm = (data: FormData) => {
    dispatch(signInUser(data));
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
                    placeholder="Enter email"
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
                    placeholder="Enter Password"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    returnKeyType="next"
                    value={value}
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

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginVertical: 10,
            }}>
            <Text
              style={styles.buttonTextStyle}
              onPress={() => {
                nav.navigate('Forgot password');
              }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            style={styles.containerStyle}
            onPress={handleSubmit(submitForm)}
            uppercase={false}>
            <Text style={{fontSize: 16}}>Login</Text>
          </Button>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Text style={styles.registerTextStyle}>Don't have a user? </Text>
            <TouchableOpacity>
              <Text
                style={styles.buttonTextStyle}
                onPress={() => {
                  nav.navigate('Register');
                }}>
                Sign up here
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default LoginForm;

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
  buttonTextStyle: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#D25660',
    fontWeight: 'normal',
    letterSpacing: 0,
    margin: 0,
    padding: 0,
  },
  registerTextStyle: {
    fontStyle: 'italic',
    fontSize: 14,
    alignSelf: 'center',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
