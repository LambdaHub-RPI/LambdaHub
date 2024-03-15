import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AgendaScreen from "./AgendaScreen";
import AddEventScreen from "./AddEventScreen";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function CalendarScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          header: ({ navigation }) => (
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddEvent')}
              >
                <Text style={styles.addButtonText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="AddEvent" component={AddEventScreen} />
    </Stack.Navigator>
  );
}
  
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addButton: {
    paddingHorizontal: 20, // Adjust padding horizontally
    paddingVertical: 10,   // Adjust padding vertically
    borderRadius: 20,      // Adjust border radius to make it more rounded
    backgroundColor: 'lightgray', // Add a background color for better visibility
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
