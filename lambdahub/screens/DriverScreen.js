import {StatusBar} from 'expo-status-bar';
import { SafeAreaView,View, Text, StyleSheet, Platform, ScrollView, Button, TouchableOpacity} from "react-native";
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import QueueList from '../components/driver_components/queue-list';


export default function DriverScreen() {
  const [text, setText] = useState("")
    return (
      <SafeAreaView>
        <ScrollView>

          <View style={styles.secondContainer}>
            {/* <Text>this is inside the scrollview </Text>
            <TextInput
              defaultValue={text}
              onChangeText={txt=>setText(txt)}
              style = {{borderWidth: 1, padding: 10}}
            />
            <Button title="press me" onPress={()=>console.log("hello")} />
            <TouchableOpacity style = {styles.btn} onPress={()=> console.log("hello2")}>
              <Text style = {{color: 'white'}}>Click me too!</Text>
            </TouchableOpacity> */}
            <QueueList/>
          </View>        
        </ScrollView>
        <StatusBar style = 'dark' />
      </SafeAreaView>  
      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondContainer: {
      backgroundColor: 'white',
      height: 1600,
      padding: 40
    },

    btn: {
      padding: 10, 
      backgroundColor : 'black',
       width: 150,
       height: 120,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });