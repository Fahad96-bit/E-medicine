import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {emailRegex, passwordRegex, baseUrl} from '../scripts/constants';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import {googleSignIn, fbSignIn} from '../utils/socialAuth';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [signUpForm, setSignUpForm] = useState([
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
      label: 'FullName',
      name: 'name',
      value: '',
      isValid: true,
      errorMessage: '',
      getValidation: value => {
        if (value.length < 3) {
          return ['Name should be greater than 3 letters', false];
        }
        if (value.length > 10) {
          return ['Name should be less than 10 letters', false];
        }
        return ['', true];
      },
    },
    {
      label: 'Password',
      name: 'password',
      minlength: '6',
      value: '',
      isValid: true,
      errorMessage: '',
      getValidation: value => {
        if (passwordRegex.test(value) && value.length >= 8) {
          return ['', true];
        }
        return [
          'Password must be 8 characters and contains atleast one number',
          false,
        ];
      },
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      minlength: '6',
      value: '',
      isValid: true,
      errorMessage: '',
      getValidation: (value, passwordVal) => {
        if (value === passwordVal) {
          return ['', true];
        }
        return ['Confirm Password must be equal to password', false];
      },
    },
  ]);

  const textFiledChangeHandler = (value, index) => {
    setSignUpForm(prev => {
      const prevForm = [...prev];
      const currentTextField = prevForm[index];
      currentTextField.value = value;
      const getValidationError = currentTextField.getValidation(
        currentTextField.value,
        signUpForm[2].value,
      );
      [currentTextField.errorMessage, currentTextField.isValid] =
        getValidationError;
      return prevForm;
    });
  };

  const validateOnSubmit = () => {
    let isValid = true;
    const ValidateArray = signUpForm.map(textField => {
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
    setSignUpForm(ValidateArray);

    return isValid;
  };

  const signUpClickHandler = async () => {
    // e.preventDefault();

    if (validateOnSubmit()) {
      const userData = {};
      signUpForm.map(({name, value}) => {
        userData[name] = value;
      });
      try {
        // const res = await axios.post(baseUrl + 'auth/register', userData);
        await auth().createUserWithEmailAndPassword(
          userData.email,
          userData.password,
        );
        showMessage({
          message: 'User registered successfully',
          type: 'success',
        });
      } catch (e) {
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
        <Text style={styles.heading}>Sign up</Text>
        <View style={styles.formContainer}>
          {signUpForm.map(({label, name, value, errorMessage}, i) => (
            <View key={name + '-' + i}>
              <Text style={styles.labels}>{label}</Text>
              <TextInput
                placeholder={label}
                onChangeText={value => textFiledChangeHandler(value, i)}
                value={value}
                style={styles.input}
                mode="outlined"
              />
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
          ))}
          <View style={styles.signUpContainer}>
            <Pressable style={styles.button} onPress={signUpClickHandler}>
              <Text style={styles.text}>Sign up</Text>
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
                onPress={() => navigation.navigate('SignIn')}
                style={styles.footerText}>
                Already have an account?
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
    marginTop: 10,
    fontSize: 14,
    marginBottom: 2,
  },
  input: {
    height: 50,
    borderColor: '#9982ac',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
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

export default SignUp;
