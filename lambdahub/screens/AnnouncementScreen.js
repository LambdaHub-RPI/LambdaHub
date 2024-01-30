import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native';

export default function AnnouncementScreen() {
  const [input, setInput] = React.useState([''])
  
  const handleAdd = () => {
    const newInputs = [...input];
    newInputs.push('');
    setInput(newInputs);
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
    <View style={styles.container}>
      <View>
        {input.map((input, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={text => handleInputChange(text, index)}
              style={styles.input}
            />
            <Button title="remove" onPress={() => handleRemove(index)} />
          </View>
        ))}
        <Button title="add" onPress={handleAdd} />
      </View>
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      padding: 5,
      width: 300,
      height: 50
    },
    
    input: {
      width: 200,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      paddingLeft: 10,
    },
  });