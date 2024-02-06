import React from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnnouncementFormScreen from 'c:/Users/andraa2/Dropbox/LambdaHub-UI/lambdahub/screens/AnnouncementFormScreen';

const Stack = createStackNavigator();

function AnnouncementScreenContent({ navigation }){
  const [input, setInput] = React.useState(['']);

  const handleAdd = () => {
    navigation.navigate('AnnouncementForm');
  };

  const handleRemove = (index) => {
    const newInputs = [...input];
    newInputs.splice(index, 1);
    setInput(newInputs);
  };

  const handleInputChange = (text, index) => {
    const newInputs = [...input];
    newInputs[index] = text;
    setInput(newInputs);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Create New Announcement" onPress={handleAdd} />
      <View>
        {input.map((input, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={text => handleInputChange(text, index)}
              style={styles.input}
            />
            <Button title="X" onPress={() => handleRemove(index)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );

}

export default function AnnouncementScreen() {
  return (
      <Stack.Navigator initialRouteName="AnnouncementScreenContent"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Announcements" component={AnnouncementScreenContent} />
        <Stack.Screen name="AnnouncementForm" component={AnnouncementFormScreen} />
      </Stack.Navigator>
  );
}
  
  const styles = StyleSheet.create({
    container: {

      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      padding: 5,
      width: '95%',
      height: 50
    },
    
    input: {
      flex: 1,
      height: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      paddingLeft: 10,
    },
  });