import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {emailRegex, passwordRegex, baseUrl} from '../scripts/constants';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {googleSignIn, fbSignIn} from '../utils/socialAuth';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '838524686178-0qp7e864vesv4p9mo2im540mhgpph59r.apps.googleusercontent.com',
    });
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
  }, []);
  // function onAuthStateChanged(user) {
  //   if (user) {
  //     console.log('user', user);
  //     dispatch({type: 'SET_AUTH', authState: !!user});
  //   }
  // }

  const [loginForm, setLoginForm] = useState([
    {
      label: 'Email',
      name: 'email',
      value: '',
      isValid: true,
      errorMessage: '',
      getValidation: value => {
        if (!emailRegex.test(value)) {
          return ['Invalid email', false];
        }
        return ['', true];
      },
    },
    {
      label: 'Password',
      name: 'password',
      minlength: '6',
      isValid: true,
      value: '',
      errorMessage: '',
      getValidation: value => {
        if (passwordRegex.test(value) && value.length >= 8) {
          return ['', true];
        }
        return ['', true];
      },
    },
  ]);

  const textFieldChangeHandler = (value, index) => {
    setLoginForm(prev => {
      const prevForm = [...prev];
      const currentTextField = prevForm[index];
      currentTextField.value = value;
      const getValidationError = currentTextField.getValidation(
        currentTextField.value,
      );
      [currentTextField.errorMessage, currentTextField.isValid] =
        getValidationError;
      return prevForm;
    });
  };

  const validateOnSubmit = () => {
    let isValid = true;
    const ValidateArray = loginForm.map(textField => {
      if (textField.value === '') {
        isValid = false;
        const {name} = textField;
        return {
          ...textField,
          errorMessage:
            name.charAt(0).toUpperCase() +
            name.slice(1) +
            ' field cannot be empty',
          isValid: false,
        };
      }
      !isValid ? null : (isValid = textField.isValid);
      return textField;
    });
    setLoginForm(ValidateArray);

    return isValid;
  };

  const loginClickHandler = async () => {
    if (validateOnSubmit()) {
      const userData = {};
      loginForm.map(({name, value}) => {
        userData[name] = value;
      });
      try {
        // const res = await axios.post(baseUrl + 'auth/login', userData);
        await auth().signInWithEmailAndPassword(
          userData.email,
          userData.password,
        );
        // showMessage({
        //   message: 'User login successfully',
        //   type: 'success',
        // });
      } catch (e) {
        // const {
        //   response: {
        //     data: {message},
        //   },
        // } = e;
        showMessage({
          message: e.message,
          type: 'danger',
        });
      }
    }
  };

  return (
    <LinearGradient
      colors={['#fff', '#f7f3fb', '#e8ddf2']}
      style={styles.linearGradient}>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Sign in</Text>

        <View style={styles.formContainer}>
          {loginForm.map(({label, name, value, errorMessage}, i) => (
            <View key={name + '-' + i}>
              <Text style={styles.labels}>{label}</Text>
              <TextInput
                placeholder={label}
                onChangeText={value => textFieldChangeHandler(value, i)}
                value={value}
                style={styles.input}
                mode="outlined"
              />
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
          ))}

          <View style={styles.signUpContainer}>
            <Pressable style={styles.button} onPress={loginClickHandler}>
              <Text style={styles.text}>Sign in</Text>
            </Pressable>
            <View style={styles.otherButtons}>
              <Pressable style={styles.btn} onPress={fbSignIn}>
                <Text style={styles.textOtherBtn}>Facebook</Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={googleSignIn}>
                <Text style={styles.textOtherBtn}>Google</Text>
              </Pressable>
            </View>
            <View style={styles.footer}>
              <Text
                onPress={() => navigation.navigate('SignUp')}
                style={styles.footerText}>
                Don't you have an account?
              </Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    paddingTop: 40,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#a86ad9',
  },
  formContainer: {
    paddingHorizontal: 30,
    top: 10,
  },
  labels: {
    color: 'gray',
    marginTop: 20,
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#9982ac',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  signUpContainer: {
    marginTop: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#9982ac',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#65ab99',
    backgroundColor: 'transparent',
    width: '45%',
  },
  otherButtons: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#fff',
  },
  textOtherBtn: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#65ab99',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 30,
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9982ac',
  },
  error: {
    color: '#ff6f6a',
  },
});

export default SignIn;
