import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AgendaScreen from "./AgendaScreen";
import AddEventScreen from "./AddEventScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const Tab = createBottomTabNavigator();

export default function CalendarScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Agenda"
      screenOptions={{
        tabBarActiveTintColor: '#21B3E1',
      }}
    >
      <Tab.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          tabBarLabel: 'Calendar',
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),// Set the label for the "Agenda" tab
        }}
      />
      <Tab.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
          tabBarLabel: "Add Event",
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="calendar-plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});