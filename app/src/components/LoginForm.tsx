import {useForm} from 'react-hook-form';
import {Button, Text, useTheme} from 'react-native-paper';
import React, {useCallback} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {AuthScreenProps} from '~routes/interface';
import useAppDispatch from '~hooks/useAppDispatch';
import {signInUser} from '~state/ducks/auth/auth.actions';
import useAppSelector from '~hooks/useAppSelector';
import {clearError} from '~state/ducks/auth/auth.reducer';

import FormInput from './FormInput';
import FormError from './FormError';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().nullable().email().required().label('Email'),
  password: yup.string().nullable().required().label('Password'),
});

const LoginForm: React.FC = () => {
  const navigation = useNavigation<AuthScreenProps<'Login'>['navigation']>();
  const {error, loading} = useAppSelector(({auth}) => auth);
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {control, handleSubmit, formState, reset} = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
        dispatch(clearError());
      };
    }, []),
  );

  const onSubmit = (data: FormData) => {
    dispatch(signInUser(data));
  };

  return (
    <ScrollView style={styles.wrapper}>
      <KeyboardAvoidingView enabled>
        <View style={styles.form}>
          <FormInput
            state={formState}
            control={control}
            name="email"
            placeholder="Email"
            keyboardType="email-address"
          />
          <FormInput
            state={formState}
            control={control}
            name="password"
            placeholder="Password"
          />
          <View style={styles.forgotPasswordSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forgot password')}>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <FormError error={error} />
        </View>

        <Button
          mode="contained"
          loading={loading}
          onPress={handleSubmit(onSubmit)}>
          Sign in
        </Button>

        <View style={[styles.loginSection]}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={[
              styles.signUpText,
              styles.signUpBtn,
              {color: colors.primary},
            ]}>
            Sign up
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    height: '100%',
    padding: 30,
  },
  form: {
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 30,
  },
  forgotPasswordSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: 16,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  signUpText: {
    textAlignVertical: 'center',
    fontSize: 16,
  },
  signUpBtn: {
    fontSize: 17,
    fontWeight: '700',
  },
});

export default LoginForm;
