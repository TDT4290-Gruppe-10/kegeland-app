import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import React, {useCallback} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import * as yup from 'yup';

import useAppDispatch from '~hooks/useAppDispatch';
import {signUpUser} from '~state/ducks/auth/auth.actions';
import {RegisterDTO} from '~state/ducks/auth/auth.interface';
import {UserRole} from '~constants/auth';
import useAppSelector from '~hooks/useAppSelector';
import {clearError} from '~state/ducks/auth/auth.reducer';

import FormInput from './FormInput';
import FormError from './FormError';

type FormData = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  firstName: yup.string().nullable().notRequired().label('First name'),
  lastName: yup
    .string()
    .when('firstName', {
      is: (firstName: string) => firstName.length > 0,
      then: yup.string().nullable().required(),
      otherwise: yup.string().nullable().notRequired(),
    })
    .label('Last name'),
  email: yup.string().nullable().email().required().label('Email'),
  password: yup.string().nullable().required().min(6).label('Password'),
  confirmPassword: yup
    .string()
    .nullable()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Confirm password'),
});

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {error, loading} = useAppSelector(({auth}) => auth);
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
    const {firstName, lastName, email, password} = data;
    const payload: RegisterDTO = {
      email,
      password,
      roles: [UserRole.PATIENT],
    };
    if (firstName && lastName) {
      payload.name = {firstName, lastName};
    }
    dispatch(signUpUser(payload));
  };

  return (
    <ScrollView style={styles.wrapper}>
      <KeyboardAvoidingView enabled>
        <View style={styles.form}>
          <FormInput
            state={formState}
            control={control}
            name="firstName"
            placeholder="First name"
          />
          <FormInput
            state={formState}
            control={control}
            name="lastName"
            placeholder="Last name"
          />
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
          <FormInput
            state={formState}
            control={control}
            name="confirmPassword"
            placeholder="Confirm password"
          />

          <FormError error={error} />
        </View>

        <Button
          mode="contained"
          loading={loading}
          onPress={handleSubmit(onSubmit)}>
          Register
        </Button>
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
});

export default RegisterForm;
