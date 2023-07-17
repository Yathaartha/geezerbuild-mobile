/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './src/app/store';
import HomeScreen from './src/screens/home/HomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SubmissionsScreen from './src/screens/submissions/SubmissionsScreen';
import {PaperProvider} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigator from './src/navigation/RootNavigator';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        {/* <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Submissions" component={SubmissionsScreen} />
            <Drawer.Screen name="Logout" component={LoginScreen} />
          </Drawer.Navigator>
        </NavigationContainer> */}
        <RootNavigator />
      </PaperProvider>
    </Provider>
  );
}

export default App;
