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

        {/* Announcement 1 */}
        <View style={styles.announcementItem}>
          <Text style={styles.announcementTitle}>Title 1</Text>
          <Text style={styles.announcementAuthor}>Author 1</Text>
          <Text style={styles.announcementDate}>Date 1</Text>
          <Text style={styles.announcementContent}>
            This is a placeholder for announcement content 1.
          </Text>
        </View>

        {/* Announcement 2 */}
        <View style={styles.announcementItem}>
          <Text style={styles.announcementTitle}>Title 2</Text>
          <Text style={styles.announcementAuthor}>Author 2</Text>
          <Text style={styles.announcementDate}>Date 2</Text>
          <Text style={styles.announcementContent}>
            This is a placeholder for announcement content 2.
          </Text>
        </View>
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
  announcementItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  announcementAuthor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  announcementContent: {
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
});

export default HomeScreen;
