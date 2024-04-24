import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity, FlatList} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

function AnnouncementScreenContent({ navigation }) {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isExpandModalVisible, setExpandModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editModalInput, setEditModalInput] = useState(modalInput);
  const [modalInput, setModalInput] = useState({
    author: '',
    title: '',
    date: '',
    announcement: '',
  });
  const [selectedAnnouncement, setSelectedAnnouncement] = useState([]);

  useEffect(()=> {
    fetchData();
  }, [])

  const fetchData = async() => {
    try {
      const response = await fetch("http://127.0.0.1:8000/announcement-api/announcements/");
      let data = await response.json();
      setSelectedAnnouncement(data);
    }
    catch (error) {
      console.error("Failed to fetch announcements!", error);
    }
  };

  const handleAdd = () => {
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    setModalInput({
      author: '',
      title: '',
      date: formatDate(new Date()),
      announcement: '',
    });

    setCreateModalVisible(true);
  };

  
  const handleRemove = async (index) => {
    if (selectedAnnouncement.length > 0) {
      try {
        const response = await fetch('http://127.0.0.1:8000/announcement-api/announcements/${selectedAnnouncement[index].id}/', {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('API call failed with status: ${response.status}');
        }

        fetchData();
      } catch (error) {
        console.error('Failed to delete announcement', error);
      }
    }
  };

  const closeModal = () => {
    setCreateModalVisible(false);
    setExpandModalVisible(false);
  };

  const handleModalInputChange = (key, text) => {
    setModalInput((prevInput) => ({ ...prevInput, [key]: text }));
  };

  const handleModalSubmit = async () => {
    const newAnnouncement = {
      author: modalInput.author,
      title: modalInput.title,
      date: modalInput.date,
      announcement: modalInput.announcement,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/announcement-api/announcements/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnnouncement)
      });
      

      if (!response.ok){
        throw new Error('API call failed with status: ${response.status}');
      }

      const newA = [newAnnouncement, ...selectedAnnouncement];
      setSelectedAnnouncement(newA);
    } catch (error) {
        console.error('Failed to add announcement: ', error);
    }
  
    setCreateModalVisible(false);
  };

  const handleExpand = (index) => {
    if (index >= 0 && index < selectedAnnouncement.length) {
      const announcementToExpand = selectedAnnouncement[index];
      setSelectedAnnouncement(announcementToExpand);
      setExpandModalVisible(true);
    } else {
      console.error('Index out of bounds or invalid index');
    }
  };

  const CustomButton = ({ title, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.customButton, style]}>
      <Text style={styles.customButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const handleEdit = (index) => {
    if (index >= 0 && index < selectedAnnouncement.length) {
      setEditModalInput(selectedAnnouncement[index]);
      setEditModalVisible(true); 
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/announcement-api/announcements/${editModalInput.id}/`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editModalInput),
      });
  
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
  
      fetchData();
      setEditModalVisible(false);
    } catch (error) {
      console.error('Failed to edit announcement', error);
    }
  };
  
  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Create New Announcement" onPress={handleAdd} />
      <View style={styles.announcementContainer}>
        {selectedAnnouncement.map((announcement, index) => (
          <View key={`${announcement.title}-${announcement.author}-${index}`} style={styles.announcementItem}>
          <View style={styles.innerAnnouncementItem}>
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
              <CustomButton title="Delete" onPress={() => handleRemove(index)} />
              <CustomButton title="Edit" onPress={() => handleRemove(index)} />
              <CustomButton title="Expand" onPress={() => handleExpand(index)}/>
            </View>
          </View>
        </View>        
        ))}
      </View>

      <Modal isVisible={isExpandModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainerExpand}>
          <Text style={styles.titleText}>Title: {selectedAnnouncement?.title}</Text>
          <Text style={styles.authorText}>Author: {selectedAnnouncement?.author}</Text>
          <Text style={styles.dateText}>Date: {selectedAnnouncement?.date}</Text>
          <Text style={styles.announcementText}>{selectedAnnouncement?.announcement}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>

      <Modal isVisible={isCreateModalVisible} onBackdropPress={closeModal}>
        <ScrollView contentContainerStyle={styles.modalContainerCreate}>
          <Text>Title:</Text>
          <TextInput
            placeholder="Enter title"
            value={modalInput.title}
            onChangeText={(text) => handleModalInputChange('title', text)}
            style={styles.modalInput}
          />
          <Text>Author:</Text>
          <TextInput
            placeholder="Enter author"
            value={modalInput.author}
            onChangeText={(text) => handleModalInputChange('author', text)}
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
          <Button title="Cancel" onPress={closeModal} />
        </ScrollView>
      </Modal>

      <Modal isVisible={isEditModalVisible} onBackdropPress={closeModal}>
        <ScrollView contentContainerStyle={styles.modalContainerCreate}>
          <Text>Title:</Text>
          <TextInput
            placeholder="Enter title"
            value={editModalInput.title}
            onChangeText={(text) => setEditModalInput({ ...editModalInput, title: text })}
            style={styles.modalInput}
          />
          <Text>Author:</Text>
          <TextInput
            placeholder="Enter author"
            value={editModalInput.author}
            onChangeText={(text) => setEditModalInput({ ...editModalInput, author: text })}
            style={styles.modalInput}
          />
          <Text>Date:</Text>
          <TextInput
            placeholder="Enter date"
            value={editModalInput.date}
            onChangeText={(text) => setEditModalInput({ ...editModalInput, date: text })}
            style={styles.modalInput}
          />
          <Text>Announcement:</Text>
          <TextInput
            multiline
            numberOfLines={4}
            value={editModalInput.announcement}
            onChangeText={(text) => setEditModalInput({ ...editModalInput, announcement: text })}
            style={[styles.modalInput, styles.modalTextArea]}
          />
          <Button title="Submit" onPress={handleEditSubmit} />
          <Button title="Cancel" onPress={closeModal} />
        </ScrollView>
      </Modal>
        

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 25,
    flexGrow: 1,
  },
  
  announcementItem: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },

  innerAnnouncementItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
  },

  inputContainer: {
    flexDirection: 'column',
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingBottom: 10,
    shadowColor: '#000',
    width: '100%',
  },

  announcementContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  input: {
    flex: 1,
    width: '100%',
    height: 60,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 1,
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
    color: 'black',
    fontWeight: 'bold',
  },

  authorText: {
    color: 'black',
    fontWeight: 'bold',
  },

  customButton: {
    backgroundColor: '#093D20', 
    padding: 8,
    borderRadius: 5,
  },
  
  customButtonText: {
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold',
  },

  modalContainerCreate: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalContainerExpand: {
    backgroundColor: '#FFFFFF',
    padding: 15,
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
    color: 'black',
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
      <Stack.Screen name="AnnouncementsScreenContent" component={AnnouncementScreenContent} />
    </Stack.Navigator>
  );
}
