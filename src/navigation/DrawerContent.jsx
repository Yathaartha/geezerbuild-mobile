import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      <Text style={{fontSize: 20, textAlign: 'center', marginVertical: 15}}>
        Drawer Content
      </Text>
      <TouchableOpacity onPress={goToHome}>
        <Text style={styles.navItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSubmissions}>
        <Text style={styles.navItem}>Submissions</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.navItem}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navItem: {
    padding: 10,
    backgroundColor: 'transparent',
  },
});

export default DrawerContent;
