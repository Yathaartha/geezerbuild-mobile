import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerContent = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const goToSubmissions = () => {
    navigation.navigate('Submissions');
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');

    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <Text>Drawer Content</Text>
      <Button title="Home" onPress={goToHome} />
      <Button title="Submissions" onPress={goToSubmissions} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default DrawerContent;
