/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import {StyleSheet, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import ProductDetail from './screens/ProductDetail';
import {Provider, useDispatch} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import cartReducer from './store/reducers/cartReducer';
import authReducer from './store/reducers/authReducer';
import Cart from './screens/Cart';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
const combinedReducers = combineReducers({
  cartReducer,
  authReducer,
});

const Stack = createNativeStackNavigator();
const store = createStore(combinedReducers);

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: 'none',
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerStyle: {
            backgroundColor: 'none',
          },
        }}
      />
    </Stack.Navigator>
  );
}
function Navigation() {
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const dispatch = useDispatch();
  function onAuthStateChanged(user) {
    try {
      if (user) {
        showMessage({
          message: 'User login successfully',
          type: 'success',
        });
        dispatch({type: 'SET_AUTH', authState: !!user});
      }
    } catch (e) {
      console.log('e', e);
    }
  }
  const {isLoggedIn} = useSelector(state => state.authReducer);
  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedStack /> : <AuthStack />}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <LinearGradient
        colors={['#fff', '#f7f3fb', '#e8ddf2']}
        style={styles.linearGradient}>
        <Navigation />
      </LinearGradient>
    </Provider>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
  },
});

export default App;
