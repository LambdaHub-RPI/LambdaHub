// AnnouncementFormScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AnnouncementFormScreen() {
  const [author, setAuthor] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    
  };

  return (
    <View style={styles.container}>
      <Text>Author:</Text>
      <TextInput placeholder="Enter author" />

      <Text>Announcement:</Text>
      <TextInput placeholder="Enter announcement" />

      <Text>Date:</Text>

      <TextInput placeholder="Autofilled date" />

      <Button title="Submit" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});


