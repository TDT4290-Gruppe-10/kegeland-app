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

const RegisterForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  // const [errortext, setErrortext] = useState('');
  // const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  //
  // const emailInputRef = createRef();
  // const ageInputRef = createRef();
  // const addressInputRef = createRef();
  // const passwordInputRef = createRef();
  const {navigation} = useNavigation<AuthScreenProps<'Register'>>();

  // const clearPasswords = () => {};

  const handleSubmitButton = () => {
    // setErrortext('');
    if (!userName) {
      Alert.alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      Alert.alert('Please fill Password');
      return;
    }
    if (!userConfirmPassword) {
      Alert.alert('Please confirm Password');
      return;
    }
    if (userPassword !== userConfirmPassword) {
      Alert.alert('Passwords does not match');
      return;
    }
    const dataToSend: any = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    let formBody: any = [];
    for (const key in dataToSend) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    navigation.navigate('Login');
  };
  // if (isRegistraionSuccess) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: '#307ecc',
  //         justifyContent: 'center',
  //       }}>
  //       <Image
  //         source={require('../Image/success.png')}
  //         style={{
  //           height: 150,
  //           resizeMode: 'contain',
  //           alignSelf: 'center',
  //         }}
  //       />
  //       <Text style={styles.successTextStyle}>Registration Successful</Text>
  //       <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
  //         <Text style={styles.buttonTextStyle}>Login Now</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  return (
    <ScrollView style={styles.mainBody}>
      <View style={{alignSelf: 'center', width: '85%'}}>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              theme={{colors: {primary: '#D25660', placeholder: '#8b9cb5'}}}
              style={styles.inputStyle}
              mode="outlined"
              onChangeText={(UserName) => setUserName(UserName)}
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   emailInputRef.current && emailInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              theme={{colors: {primary: '#D25660', placeholder: '#8b9cb5'}}}
              style={styles.inputStyle}
              mode="outlined"
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              autoCapitalize="none"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   passwordInputRef.current && passwordInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              theme={{colors: {primary: '#D25660', placeholder: '#8b9cb5'}}}
              style={styles.inputStyle}
              mode="outlined"
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              secureTextEntry={true}
              // onSubmitEditing={() =>
              //   ageInputRef.current && ageInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              theme={{colors: {primary: '#D25660', placeholder: '#8b9cb5'}}}
              style={styles.inputStyle}
              mode="outlined"
              onChangeText={(UserConfirmPassword) =>
                setUserConfirmPassword(UserConfirmPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Confirm Password"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              secureTextEntry={true}
              // onSubmitEditing={() =>
              //   ageInputRef.current && ageInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <Button
            mode="contained"
            style={styles.containerStyle}
            onPress={handleSubmitButton}
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
