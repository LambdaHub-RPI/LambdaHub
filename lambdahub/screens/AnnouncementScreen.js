import { View, Text, StyleSheet } from "react-native";

export default function AnnouncementScreen() {
    return (
      <View style={styles.container}>
        <Text>Announcement Screen</Text>
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