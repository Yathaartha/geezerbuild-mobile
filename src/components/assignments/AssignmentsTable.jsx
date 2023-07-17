import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAssignments} from './assignmentSlice';
import {DataTable} from 'react-native-paper';
import AssignmentModal from './AssignmentModal';

const AssignmentsTable = ({navigation}) => {
  const dispatch = useDispatch();
  const {list} = useSelector(state => state.assignment);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(list[0]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    dispatch(getAssignments());
  }, []);

  const renderRows = () => {
    if (list.length > 0) {
      return list.map((assignment, index) => {
        return (
          <DataTable.Row key={index}>
            <DataTable.Cell textStyle={{fontWeight: 'bold', color: '#000'}}>
              {assignment.title}
            </DataTable.Cell>

            <DataTable.Cell numberOfLines={2}>
              {assignment.detail}
            </DataTable.Cell>

            <DataTable.Cell>
              {new Date(assignment.dueDate).toLocaleDateString()}
            </DataTable.Cell>

            <DataTable.Cell
              style={styles.btn}
              textStyle={{color: '#fff'}}
              onPress={() => {
                setSelectedAssignment(assignment);
                openModal();
              }}>
              Submit
            </DataTable.Cell>
          </DataTable.Row>
        );
      });
    }
  };

  return (
    <DataTable>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Title</DataTable.Title>
        <DataTable.Title>Details</DataTable.Title>
        <DataTable.Title>Due Date</DataTable.Title>
        <DataTable.Title>Action</DataTable.Title>
      </DataTable.Header>
      {renderRows()}
      <AssignmentModal
        visible={modalVisible}
        closeModal={closeModal}
        assignment={selectedAssignment}
        navigation={navigation}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  btn: {
    backgroundColor: '#78B7BB',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default AssignmentsTable;
