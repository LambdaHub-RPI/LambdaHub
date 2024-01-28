import { View, Text, StyleSheet } from "react-native";

export default function DriverScreen() {
    return (
      <View style={styles.container}>
        <Text>Driver Screen</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });