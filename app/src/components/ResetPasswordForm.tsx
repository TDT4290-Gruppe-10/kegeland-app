import {Button, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AuthScreenProps} from '~routes/interface';

const ResetPasswordForm: React.FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [errortext, setErrortext] = useState('');
  const {navigation} = useNavigation<AuthScreenProps<'Forgot password'>>();

  // const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      Alert.alert('Please fill Email');
      return;
    }
    const dataToSend: any = {email: userEmail};
    let formBody: any = [];
    for (const key in dataToSend) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.mainBody}>
      <View style={{alignSelf: 'center', width: '85%'}}>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              theme={{colors: {primary: '#D25660', placeholder: '#8b9cb5'}}}
              style={styles.inputStyle}
              mode="outlined"
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              placeholder="Enter Email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          {errortext !== '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <Button
            mode="contained"
            style={styles.containerStyle}
            onPress={handleSubmitPress}
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
