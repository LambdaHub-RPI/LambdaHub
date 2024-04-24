import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

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
            Placeholder for announcement content 1.
          </Text>
        </View>

        {/* Announcement 2 */}
        <View style={styles.announcementItem}>
          <Text style={styles.announcementTitle}>Title 2</Text>
          <Text style={styles.announcementAuthor}>Author 2</Text>
          <Text style={styles.announcementDate}>Date 2</Text>
          <Text style={styles.announcementContent}>
            Placeholder for announcement content 2.
          </Text>
        </View>
      </View>

      <View style={styles.eventsContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>

        {/* Event 1 */}
        <View style={styles.eventItem}>
          <Text style={styles.eventName}>Event Name 1</Text>
          <Text style={styles.eventDate}>Date 1</Text>
          <Text style={styles.eventTime}>
            Start Time 1 - End Time 1
          </Text>
          <Text style={styles.eventDescription}>
            Placeholder for event description 1.
          </Text>
        </View>

        {/* Event 2 */}
        <View style={styles.eventItem}>
          <Text style={styles.eventName}>Event Name 2</Text>
          <Text style={styles.eventDate}>Date 2</Text>
          <Text style={styles.eventTime}>
            Start Time 2 - End Time 2
          </Text>
          <Text style={styles.eventDescription}>
            Placeholder for event description 2.
          </Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://poledeon.org/wp-content/uploads/2021/10/1200px-Lambda_Chi_Alpha_letters_green_on_gold.svg.png' }}
          style={styles.bottomImage}
        />
        <Text style={styles.authorsText}>
          Authors:
        </Text>
        <Text style={styles.namesText}>
          Nevin Joshy, Jason Greenberg, Adriano Andrade
        </Text>
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
    color: '#FFD133', // Color for "Lambda"
  },
  hub: {
    color: '#5E266D', // Color for "Hub"
  },
  imageContainer: {
    marginTop: 16,
    alignItems: 'center', 
  },
  bottomImage: {
    width: 424,
    height: 126, 
    borderRadius: 10,
  },
  authorsText: {
    marginTop: 8,
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  namesText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
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
  eventItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#333',
  },
});

export default HomeScreen;
