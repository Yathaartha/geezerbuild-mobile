import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AssignmentsTable = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.header}>Title</Text>
        <Text style={styles.header}>Detail</Text>
        <Text style={styles.header}>Due Date</Text>
        <Text style={styles.header}>Action</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>John Doe</Text>
        <Text style={styles.cell}>25</Text>
        <Text style={styles.cell}>New York</Text>
        <Text style={styles.cell}>New York</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Jane Smith</Text>
        <Text style={styles.cell}>30</Text>
        <Text style={styles.cell}>San Francisco</Text>
        <Text style={styles.cell}>San Francisco</Text>
      </View>
      {/* Add more rows as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  header: {
    fontWeight: 'bold',
    flex: 1,
  },
  cell: {
    flex: 1,
  },
});

export default AssignmentsTable;
