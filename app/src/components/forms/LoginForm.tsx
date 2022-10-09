import {useForm} from 'react-hook-form';
import {Text, useTheme} from 'react-native-paper';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {AuthScreenProps} from '~routes/interface';
import useAppDispatch from '~hooks/useAppDispatch';
import {signInUser} from '~state/ducks/auth/auth.actions';
import useAppSelector from '~hooks/useAppSelector';
import {clearError} from '~state/ducks/auth/auth.reducer';
import Button from '~components/Button';

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
  const {loading, error} = useAppSelector((state) => state.auth);
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
    <ScrollView>
      <View style={styles.form}>
        <FormInput
          state={formState}
          control={control}
          name="email"
          placeholder="Email"
          icon="at"
          keyboardType="email-address"
        />
        <FormInput
          state={formState}
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry
          icon="lock-outline"
        />
      </View>

      <View style={styles.forgotPasswordSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Forgot password')}>
          <Text style={[styles.forgotPasswordText, {color: colors.primary}]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        loading={loading}
        onPress={handleSubmit(onSubmit)}>
        Sign in
      </Button>
      <FormError error={error} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  forgotPasswordSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 50,
  },
  forgotPasswordText: {
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: '700',
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
});

export default LoginForm;