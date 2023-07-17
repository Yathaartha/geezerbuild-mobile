import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import AssignmentsTable from '../../components/assignments/AssignmentsTable';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Text style={styles.head}>Assignments List</Text>
      <AssignmentsTable navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  head: {paddingVertical: 20, textAlign: 'center', fontSize: 20},
});

export default HomeScreen;
