import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './DrawerContent';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import SubmissionsScreen from '../screens/submissions/SubmissionsScreen';

// Create the stack navigator for the login screen
const LoginNavigator = createNativeStackNavigator();

function LoginStack() {
  return (
    <LoginNavigator.Navigator screenOptions={{headerShown: false}}>
      <LoginNavigator.Screen name="Login" component={LoginScreen} />
    </LoginNavigator.Navigator>
  );
}

// Create the drawer navigator for other screens
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Submissions" component={SubmissionsScreen} />
    </Drawer.Navigator>
  );
}

// Create the root navigator
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={LoginStack} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
