import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {submitAssignment} from './assignmentSlice';
import {useDispatch} from 'react-redux';

const AssignmentModal = ({visible, closeModal, assignment, navigation}) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Process the selected file
      console.log('Selected file:', res);
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('File picker cancelled.');
      } else {
        // Error occurred while picking the file
        console.log('Error:', err);
      }
    }
  };

  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const response = await dispatch(
      submitAssignment({
        file: file,
        userId: userId,
        assignmentId: assignment.id,
      }),
    );

    if (response) {
      closeModal();
      navigation.navigate('Drawer', {screen: 'Submissions'});
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {assignment ? assignment.title : '-'}
          </Text>
          <View style={styles.dataWrap}>
            <Text style={styles.label}>Details:</Text>
            <Text>{assignment ? assignment.detail : '-'}</Text>
          </View>
          <View style={styles.dataWrap}>
            <Text style={styles.label}>Due Date:</Text>
            <Text>
              {new Date(
                assignment ? assignment.dueDate : new Date(),
              ).toLocaleDateString()}
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Button title="Upload File" onPress={handleFileUpload} />
          </View>
          <View>
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text style={styles.closeBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '700',
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: '700',
  },
  dataWrap: {
    marginVertical: 10,
  },
  closeBtn: {
    backgroundColor: '#78B7BB',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    paddingVertical: 5,
  },
});

export default AssignmentModal;
