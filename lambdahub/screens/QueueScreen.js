import {StatusBar} from 'expo-status-bar';
import { SafeAreaView,View, Text, StyleSheet, Platform, ScrollView, Button, TouchableOpacity} from "react-native";
import QueueList from '../components/driver_components/QueueList';
import { useNavigation } from "@react-navigation/native";




const QueueScreen = () => {

  return (

    <SafeAreaView>
      

        <View style={styles.secondContainer}>

          <QueueList/>
        </View>        
      
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

export default QueueScreen;