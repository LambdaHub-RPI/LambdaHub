import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          <Text style={styles.lambda}>Lambda</Text>
          <Text style={styles.hub}>Hub</Text>
        </Text>
      </View>

      <View style={styles.announcementsContainer}>
        <Text style={styles.sectionTitle}>Recent Announcements</Text>
        {/* Placeholder for recent announcements */}
      </View>

      <View style={styles.eventsContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {/* Placeholder for upcoming events */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  lambda: {
    color: '#FFD133', // Hex color for "Lambda"
  },
  hub: {
    color: '#5E266D', // Hex color for "Hub"
  },
  announcementsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  eventsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default HomeScreen;
