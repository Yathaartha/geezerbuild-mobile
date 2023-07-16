import React from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AssignmentsTable from '../../components/assignments/AssignmentsTable';

const HomeScreen = () => {
  const headers = ['Title', 'Detail', 'Due Date', 'Action'];

  const element = (data, index) => (
    <TouchableOpacity>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <Text>Assignments List</Text>
      <AssignmentsTable />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});

export default HomeScreen;
