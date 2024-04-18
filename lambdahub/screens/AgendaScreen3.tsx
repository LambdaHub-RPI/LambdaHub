import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function AgendaScreen({ route, navigation }) {
  const [items, setItems] = useState(route.params?.updatedItems || {});

  useEffect(() => {
    if (route.params?.updatedItems) {
      setItems(route.params.updatedItems);
    }
  }, [route.params?.updatedItems]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("running backend");
      const response = await fetch('http://129.161.214.42:8000/event-api/events/');
      const data = await response.json();

      const updatedItems = {};

      data.forEach((event) => {
        const time = new Date(event.date);
        const strTime = time.toISOString().slice(0, 10);

        if (!updatedItems[strTime]) {
          updatedItems[strTime] = [];
        }
        updatedItems[strTime].push({
          id: event.id,
          name: event.name,
          startTime: event.starttime,
          endTime: event.endtime,
          data: event.description,
        });
      });

      setItems(updatedItems);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleDeleteEvent = async (event) => {
    try {
      const response = await fetch(`http://129.161.214.42:8000/event-api/events/${event.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Refresh the agenda by refetching data
      fetchData();
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={items}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.time}>{item.startTime} - {item.endTime}</Text>
              <Text style={styles.itemData}>{item.data}</Text>
              <TouchableOpacity onPress={() => handleDeleteEvent(item)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        renderEmptyDate={() => (
          <View style={styles.emptyDateItem}>
            <Text style={styles.emptyDateText}>No Events Scheduled</Text>
          </View>
        )}
        loadItemsForMonth={async (data) => {
          console.log("running this");
          const currentDate = new Date();
          const updatedItems = { ...items };
          var date = new Date(data.dateString);

          if (!updatedItems[currentDate.toISOString().slice(0, 10)]) {
            date = currentDate;
          }

          // Load the last 10 days and next 31 with empty lists
          for (let i = -10; i < 31; i++) {
            const newdate = new Date(date);
            newdate.setDate(date.getDate() + i);
            if (!updatedItems[newdate.toISOString().slice(0, 10)]) {
              updatedItems[newdate.toISOString().slice(0, 10)] = [];
            }
          }
          setItems(updatedItems);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
    marginLeft: 0,
    marginTop: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  time: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  itemData: {
    fontSize: 14,
    color: '#777',
  },
  emptyDateItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginLeft: 0,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 
