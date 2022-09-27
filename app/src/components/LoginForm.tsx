import {Button, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AuthScreenProps} from '~routes/interface';

const LoginForm: React.FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const {navigation} = useNavigation<AuthScreenProps<'Login'>>();

  // const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      Alert.alert('Please fill Password');
      return;
    }
    const dataToSend: any = {email: userEmail, password: userPassword};
    let formBody: any = [];
    for (const key in dataToSend) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
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
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              theme={{colors: {primary: '#D25660', placeholder: '#8b9cb5'}}}
              style={styles.inputStyle}
              mode="outlined"
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              returnKeyType="next"
            />
          </View>
          {errortext !== '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginVertical: 10,
            }}>
            <Text
              style={styles.buttonTextStyle}
              onPress={() => {
                navigation.navigate('Forgot password');
              }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            style={styles.containerStyle}
            onPress={handleSubmitPress}
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
                  navigation.navigate('Register');
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
