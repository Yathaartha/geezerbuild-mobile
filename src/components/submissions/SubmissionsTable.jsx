import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DataTable} from 'react-native-paper';
import {getSubmissions, removeSubmission} from './submissionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubmissionsTable = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const dispatch = useDispatch();
  const {list} = useSelector(state => state.submission);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem('userId');
      setUserId(value);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getSubmissions({studentId: userId}));
  }, [userId]);

  const deleteSubmission = async () => {
    const response = await dispatch(
      removeSubmission({assignmentId: selectedSubmission.id}),
    );
    if (response) {
      await dispatch(getSubmissions({studentId: userId}));
    }
  };

  const createAlert = () => {
    Alert.alert('Are you sure you want to remove submission?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteSubmission()},
    ]);
  };

  const renderRows = () => {
    if (list.length > 0) {
      return list.map((submission, index) => {
        return (
          <DataTable.Row key={index}>
            <DataTable.Cell
              textStyle={{fontWeight: 'bold', color: '#000'}}
              onPress={() => {
                setSelectedSubmission(submission);
                openModal();
              }}>
              {submission ? submission.title : '-'}
            </DataTable.Cell>

            <DataTable.Cell>
              {new Date(
                submission ? submission.dueDate : new Date(),
              ).toLocaleDateString()}
            </DataTable.Cell>

            <DataTable.Cell
              style={styles.btn}
              textStyle={{color: '#fff'}}
              onPress={() => {
                setSelectedSubmission(submission);
                createAlert();
              }}>
              Remove
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
        <DataTable.Title>Due Date</DataTable.Title>
        <DataTable.Title>Action</DataTable.Title>
      </DataTable.Header>
      {renderRows()}
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

export default SubmissionsTable;
