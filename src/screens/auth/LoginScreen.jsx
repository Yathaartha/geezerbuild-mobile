import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import LoginForm from '../../components/login/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    async function getLocalData() {
      const data = await AsyncStorage.getItem('token');

      setAccessToken(data);
    }

    getLocalData();
  });

  useEffect(() => {
    if (accessToken && accessToken !== '') {
      navigation.navigate('Drawer', {screen: 'Home'});
    }
  }, [accessToken]);

  return (
    <View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default LoginScreen;
