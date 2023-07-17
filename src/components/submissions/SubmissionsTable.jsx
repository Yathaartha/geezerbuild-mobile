import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DataTable} from 'react-native-paper';
import {getSubmissions} from './submissionSlice';
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
      dispatch(getSubmissions({studentId: userId}));
    }
    fetchData();
  }, []);

  const deleteSubmission = async () => {
    if (response) {
      toast('Assignment Deleted', {
        type: 'success',
      });
      await dispatch(getSubmissions({studentId: userId}));
      handleOk();
    } else {
      toast('Assignment Deletion Failed', {
        type: 'error',
      });
    }
  };

  const createAlert = () => {
    Alert.alert('Are you sure you want to remove submission?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteSubmission()},
    ]);
  };

  const handleDownload = async file => {
    const fileURL = URL.createObjectURL(file);

    const supported = await Linking.canOpenURL(fileURL);
    if (supported) {
      await Linking.openURL(url);
    }
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

            <DataTable.Cell onPress={() => handleDownload(submission.file)}>
              Download
            </DataTable.Cell>

            <DataTable.Cell
              style={styles.btn}
              textStyle={{color: '#fff'}}
              onPress={() => createAlert()}>
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
        <DataTable.Title>File</DataTable.Title>
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
