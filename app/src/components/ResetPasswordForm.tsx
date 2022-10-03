import {useForm} from 'react-hook-form';
import {Banner, Button} from 'react-native-paper';
import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';

import useAppDispatch from '~hooks/useAppDispatch';
import {resetPassword} from '~state/ducks/auth/auth.actions';
import useAppSelector from '~hooks/useAppSelector';
import {AuthScreenProps} from '~routes/interface';
import {clearError} from '~state/ducks/auth/auth.reducer';

import FormInput from './FormInput';
import FormError from './FormError';

type FormData = {
  email: string;
};

const schema = yup.object({
  email: yup.string().nullable().email().required().label('Email'),
});

const ResetPasswordForm: React.FC = () => {
  const navigation =
    useNavigation<AuthScreenProps<'Forgot password'>['navigation']>();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string | undefined>(undefined);
  const {loading, error} = useAppSelector(({auth}) => auth);
  const {control, handleSubmit, formState, reset} = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail(undefined);
        reset();
        dispatch(clearError());
      };
    }, []),
  );

  const onSubmit = (data: FormData) => {
    setEmail(data.email);
    dispatch(resetPassword(data));
  };

  return (
    <ScrollView style={styles.wrapper}>
      {email && !loading ? (
        <Banner
          visible={true}
          actions={[
            {
              label: 'Sign in',
              onPress: () => navigation.navigate('Login'),
            },
          ]}
          children={`A mail with steps for recovering your password was sent to ${email}.`}
        />
      ) : (
        <KeyboardAvoidingView>
          <View style={styles.form}>
            <FormInput
              state={formState}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <FormError error={error} />
          </View>

          <Button
            mode="contained"
            loading={loading}
            onPress={handleSubmit(onSubmit)}>
            Reset password
          </Button>
        </KeyboardAvoidingView>
      )}
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

export default ResetPasswordForm;
