import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

function AnnouncementScreenContent({ navigation }) {
  const [input, setInput] = useState([]);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isExpandModalVisible, setExpandModalVisible] = useState(false);
  const [modalInput, setModalInput] = useState({
    author: '',
    title: '',
    date: '',
    announcement: '',
  });
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleAdd = () => {
    setCreateModalVisible(true);
  };

  const handleRemove = (index) => {
    const newInputs = [...input];
    newInputs.splice(index, 1);
    setInput(newInputs);
  };

  const closeModal = () => {
    setCreateModalVisible(false);
    setExpandModalVisible(false);
  };

  const handleModalInputChange = (key, text) => {
    setModalInput((prevInput) => ({ ...prevInput, [key]: text }));
  };

  const handleModalSubmit = () => {
    const newAnnouncement = {
      author: modalInput.author,
      title: modalInput.title,
      date: modalInput.date,
      announcement: modalInput.announcement,
    };
  
    setInput(prevInput => [...prevInput, newAnnouncement]);
  
    setModalInput({
      author: '',
      title: '',
      date: '',
      announcement: '',
    });
  
    setCreateModalVisible(false);
  };

  const handleExpand = (index) => {
    setSelectedAnnouncement(input[index]);
    setExpandModalVisible(true);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Create New Announcement" onPress={handleAdd} />
      <View style={styles.announcementContainer}>
        {input.map((announcement, index) => (
          <View key={`${announcement.title}-${announcement.author}-${index}`} style={styles.announcementItem}>
            <View style={styles.titleCont}>
              <Text style={styles.titleText}>Title: {announcement.title}</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                multiline
                numberOfLines={4}
                value={announcement.announcement}
                editable={false} 
                style={styles.input}
              />
            </View>
            <View style={styles.titleCont}>
              <Text style={styles.titleText}>Author: {announcement.author}</Text>
              <Text style={styles.dateText}>Date: {announcement.date}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Delete" onPress={() => handleRemove(index)} />
              <Button title="Expand" onPress={() => handleExpand(index)} />
            </View>
          </View>
        ))}
      </View>

      <Modal isVisible={isExpandModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.titleText}>Title: {selectedAnnouncement?.title}</Text>
          <Text style={styles.authorText}>Author: {selectedAnnouncement?.author}</Text>
          <Text style={styles.dateText}>Date: {selectedAnnouncement?.date}</Text>
          <Text style={styles.announcementText}>{selectedAnnouncement?.announcement}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>

      <Modal isVisible={isCreateModalVisible} onBackdropPress={closeModal}>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text>Author:</Text>
          <TextInput
            placeholder="Enter author"
            value={modalInput.author}
            onChangeText={(text) => handleModalInputChange('author', text)}
            style={styles.modalInput}
          />
          <Text>Title:</Text>
          <TextInput
            placeholder="Enter title"
            value={modalInput.title}
            onChangeText={(text) => handleModalInputChange('title', text)}
            style={styles.modalInput}
          />
          <Text>Date:</Text>
          <TextInput
            placeholder="Enter date"
            value={modalInput.date}
            onChangeText={(text) => handleModalInputChange('date', text)}
            style={styles.modalInput}
          />
          <Text>Announcement:</Text>
          <TextInput
            placeholder="Enter announcement"
            multiline
            numberOfLines={4}
            value={modalInput.announcement}
            onChangeText={(text) => handleModalInputChange('announcement', text)}
            style={[styles.modalInput, styles.modalTextArea]}
          />
          <Button title="Submit" onPress={handleModalSubmit} />
          <Button title="Close Modal" onPress={closeModal} />
        </ScrollView>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    flexGrow: 1,
  },

  inputContainer: {
    flexDirection: 'column',
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingRight: 15,
    paddingBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    width: '100%',
  },

  announcementContainer: {
    flex: 1,
    width: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  input: {
    flex: 1,
    width: '100%',
    height: 60,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },

  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  titleText: {
    fontWeight: 'bold',
  },

  dateText: {
    color: '#666666',
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  modalTextArea: {
    height: 200, 
  },
});

export default function AnnouncementScreen() {
  return (
    <Stack.Navigator initialRouteName="AnnouncementScreenContent" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Announcements" component={AnnouncementScreenContent} />
    </Stack.Navigator>
  );
}
