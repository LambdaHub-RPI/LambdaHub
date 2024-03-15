import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

function AnnouncementScreenContent({ navigation }) {
  const [input, setInput] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalInput, setModalInput] = useState({
    author: '',
    title: '',
    date: '',
    announcement: '',
  });

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleRemove = (index) => {
    const newInputs = [...input];
    newInputs.splice(index, 1);
    setInput(newInputs);
  };

  /*   Not needed anymore because modal will automatically enter info
  const handleInputChange = (text, index) => {
    setInput((prevInput) => {
      const newInputs = [...prevInput];
      newInputs[index] = text;
      return newInputs;
    });
  };
  Keeping just incase for future */

  const closeModal = () => {
    setModalVisible(false);
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
  
    setModalVisible(false);
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

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
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
            style={styles.modalInput}
          />
          <Button title="Submit" onPress={handleModalSubmit} />
          <Button title="Close Modal" onPress={closeModal} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },

  inputContainer: {
    flexDirection: 'column',
    borderColor: 'black',
    paddingLeft: 5,
    paddingRight: 3,

    width: "95%",
    height: 85
  },

  announcementContainer: {
    height: 160,
    width: 375
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 373,
    paddingRight: 5,
    height: 40
  },

  input: {
    flex: 1,
    alignItems: 'center',
    width: 360,
    height: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 5,
    paddingLeft: 5,
  },

  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
    width: 375,
    paddingHorizontal: 5,
  },

  titleText: {
    flex: 1,
  },

  dateText: {
    position: 'absolute', 
    left: 190,
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    color: 'black',
  },
});

export default function AnnouncementScreen() {
  return (
    <Stack.Navigator initialRouteName="AnnouncementScreenContent" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Announcements" component={AnnouncementScreenContent} />
    </Stack.Navigator>
  );
}
