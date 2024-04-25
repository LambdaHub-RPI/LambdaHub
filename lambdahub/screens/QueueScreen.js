import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import QueueList from '../components/driver_components/QueueList';
import { Picker } from '@react-native-picker/picker';

const QueueScreen = () => {
  const [rides, setRides] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [newRide, setNewRide] = useState({
    name: '',
    startlocation: '',
    endlocation: '',
    numPassengers: '',
    isEmergency: false,
  });

  useEffect(() => {
    fetchRides();
  }, []);
  const fetchRides = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/ride-api/rides/');
      let data = await response.json();
      data = data.sort((a, b) => b.isEmergency - a.isEmergency); // Sorting logic
      setRides(data);
    } catch (error) {
      console.error('Failed to fetch rides:', error);
    }
  };


  const addRide = async () => {
    setModalVisible(false);
  
    const rideData = {
      name: newRide.name,
      startlocation: newRide.startlocation,
      endlocation: newRide.endlocation,
      numPassengers: parseInt(newRide.numPassengers, 10),
      isEmergency: newRide.isEmergency,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/ride-api/rides/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rideData),
      });
  
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
  
      const newRides = [...rides, rideData].sort((a, b) => b.isEmergency - a.isEmergency);
      setRides(newRides);
      setNewRide({ name: '', startlocation: '', endlocation: '', numPassengers: '', isEmergency: false });
    } catch (error) {
      console.error('Failed to add ride:', error);
    }
  };
  
  const deleteRide = async ( identifier ) => {
    console.log(rides)
    if (rides.length > 0) {
      console.log(rides)
      try {
        const response = await fetch(`http://127.0.0.1:8000/ride-api/rides/${identifier}/`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        Alert.alert("Success", "Ride completed and removed.");
        fetchRides(); // Refresh the list of rides
      } catch (error) {
        console.error('Failed to complete ride:', error);
        Alert.alert("Error", "Failed to complete ride.");
      }
    } else {
      Alert.alert("Info", "No rides to complete.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <QueueList data={rides} onDelete={deleteRide} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add New Ride</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>New Ride Details</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewRide({ ...newRide, name: text })}
              value={newRide.name}
              placeholder="Name"
            />
            <Text style={styles.label}>From Location:</Text>
            <Picker
              selectedValue={newRide.fromLocation}
              onValueChange={(itemValue, itemIndex) =>
                setNewRide({ ...newRide, fromLocation: itemValue })
              }
              style={styles.picker}
            >
              {['NutHut', 'Alpine', 'HOUSE', '288 Hoosick'].map((location, index) => (
                <Picker.Item key={index} label={location} value={location} />
              ))}
            </Picker>
            <Text style={styles.label}>To Location:</Text>
            <Picker
              selectedValue={newRide.toLocation}
              onValueChange={(itemValue, itemIndex) =>
                setNewRide({ ...newRide, toLocation: itemValue })
              }
              style={styles.picker}
            >
              {['NutHut', 'Alpine', 'HOUSE', '288 Hoosick'].map((location, index) => (
                <Picker.Item key={index} label={location} value={location} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewRide({ ...newRide, numPassengers: text })}
              value={newRide.numPassengers}
              placeholder="Number of Passengers"
              keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Text>Is Emergency:</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#ff0000" }}
                thumbColor={newRide.isEmergency ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setNewRide({ ...newRide, isEmergency: !newRide.isEmergency })}
                value={newRide.isEmergency}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={addRide}
            >
              <Text style={styles.textStyle}>Add Ride</Text>
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
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
    margin: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    width: 200,
    height: 44,
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default QueueScreen;