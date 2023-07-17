import React from 'react';
import {Text, View} from 'react-native';
import LoginForm from '../../components/login/LoginForm';

const LoginScreen = ({navigation}) => {
  return (
    <View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default LoginScreen;
