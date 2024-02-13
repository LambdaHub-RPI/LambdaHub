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
    setInput((prevInput) => {
      const newInputs = [...prevInput];
      newInputs[index] = text;
      return newInputs;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Create New Announcement" onPress={handleAdd} />
      <View style={styles.announcementContainer}>
        <View>
          {input.map((input, index) => (
            <View key={index} style={styles.inputContainer}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  value={input}
                  onChangeText={text => handleInputChange(text, index)}
                  style={styles.input}
                />
            </View>
          ))}
        </View>
        <View >
          {input.map((input, index) => (
            <View key={index} style={styles.buttonContainer}>
              <Button title="Delete" onPress={() => handleRemove(index)}/>
              <Button title="Expand" onPress={() => handleRemove(index)}/>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

}

export default function AnnouncementScreen() {
  return (
      <Stack.Navigator initialRouteName="AnnouncementScreenContent" screenOptions={{headerShown: false}} >
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
      padding: 5
    },

    inputContainer: {
      flexDirection: 'column',
      borderColor: 'black',
      paddingLeft: 5,
      paddingRight: 3,
      paddingTop: 5,
      width: "95%",
      height: 85
    },

    announcementContainer: {
      borderColor: 'black',
      borderWidth: 1,
      height: 125,
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

  });