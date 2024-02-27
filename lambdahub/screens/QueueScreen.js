import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import QueueList from '../components/driver_components/QueueList';
import { DUMMY_DATA } from '../data/dummy';

const QueueScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newRide, setNewRide] = useState({ requestors_name: '', fromWhere: '', toWhere: '', numPassengers: '' });
  const [localDummyData, setLocalDummyData] = useState([...DUMMY_DATA]);

  const handleNewRide = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    const id = localDummyData.length;
    const updatedData = [...localDummyData, { id, ...newRide, deleted: false }];
    setLocalDummyData(updatedData);
    setModalVisible(false);
    setNewRide({ requestors_name: '', fromWhere: '', toWhere: '', numPassengers: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <QueueList data={localDummyData} setData={setLocalDummyData} />
      <TouchableOpacity style={styles.addButton} onPress={handleNewRide}>
        <Text style={styles.buttonText}>Make a New Ride</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Ride Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="rgba(0, 128, 0, 0.5)"
              onChangeText={text => setNewRide(prevState => ({ ...prevState, requestors_name: text }))}
              value={newRide.requestors_name}
            />
            <TextInput
              style={styles.input}
              placeholder="From Where"
              placeholderTextColor="rgba(0, 128, 0, 0.5)"
              onChangeText={text => setNewRide(prevState => ({ ...prevState, fromWhere: text }))}
              value={newRide.fromWhere}
            />
            <TextInput
              style={styles.input}
              placeholder="To Where"
              placeholderTextColor="rgba(0, 128, 0, 0.5)"
              onChangeText={text => setNewRide(prevState => ({ ...prevState, toWhere: text }))}
              value={newRide.toWhere}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Passengers"
              placeholderTextColor="rgba(0, 128, 0, 0.5)"
              onChangeText={text => setNewRide(prevState => ({ ...prevState, numPassengers: text }))}
              value={newRide.numPassengers}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QueueScreen;
