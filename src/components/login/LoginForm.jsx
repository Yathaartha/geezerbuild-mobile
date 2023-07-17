import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import styled from 'styled-components';
import {loginAsync} from './authSlice';
import ErrorText from '../common/ErrorText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PrimaryButton from '../common/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Input = styled.TextInput`
  border-width: 1px;
  border-radius: 10px;
  padding: 10px 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FormWrap = styled.View`
  padding: 0 20px;
  justify-content: center;
  height: 100%;
`;

const LoginForm = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState([]);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const loginState = useSelector(state => state.login);

  const handleSubmit = async () => {
    try {
      const response = await dispatch(loginAsync({username, password}));
      if (response.payload?.data) {
        await AsyncStorage.setItem('token', response.payload.data.token);
        await AsyncStorage.setItem(
          'userId',
          JSON.stringify(response.payload.data.user),
        );
        navigation.navigate('Home');
        setError('');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrap>
      <Input
        placeholder="Username"
        value={username}
        onEndEditing={() => setFocus([...focus, 'username'])}
        onChangeText={text => setUsername(text)}
      />
      {focus.includes('username') && username === '' ? (
        <ErrorText text={'Username is empty'} />
      ) : (
        ''
      )}
      <Input
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onEndEditing={() => setFocus([...focus, 'password'])}
        onChangeText={text => setPassword(text)}
      />
      {focus.includes('password') && password === '' ? (
        <ErrorText text="Password is empty" />
      ) : (
        ''
      )}
      <ErrorText text={error}></ErrorText>
      <PrimaryButton
        title="Login"
        onPress={() => {
          handleSubmit();
        }}
      />
    </FormWrap>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default LoginForm;
