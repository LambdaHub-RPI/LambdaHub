import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AgendaScreen from "./AgendaScreen";

export default function CalendarScreen() {
    return (
      <View style={styles.container}>
        <AgendaScreen />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });