import React from 'react';
import {Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const AssignmentModal = ({visible, closeModal, assignment}) => {
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
