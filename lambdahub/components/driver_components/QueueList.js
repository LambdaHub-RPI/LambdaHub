import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, Alert, Text, TouchableOpacity } from 'react-native';
import QueueItem from './QueueItem';

const QueueList = ({ data, setData }) => {
  // State to manage the first selected item for merge
  const [selectedForMerge, setSelectedForMerge] = useState(null);

  useEffect(() => {
    const allDeleted = data.every(item => item.deleted);
    if (allDeleted) {
      Alert.alert('End of List', 'No more items to display.');
    }
  }, [data]);

  const handleDelete = (id) => {
    setData(prevData =>
      prevData.map(item => (item.id === id ? { ...item, deleted: true } : item))
    );
  };

  const handleAttemptMerge = (id, numPassengers) => {
    if (selectedForMerge === null) {
      // First item selected for a merge; store its info
      setSelectedForMerge({ id, numPassengers });
      Alert.alert('Merge Ride', 'Select another ride to merge with.');
    } else {
      // Attempt to merge with the second selected item
      if (id === selectedForMerge.id) {
        Alert.alert('Merge Ride', 'Cannot merge a ride with itself.');
        return;
      }

      const targetRide = data.find(item => item.id === id);
      if (targetRide && (selectedForMerge.numPassengers + targetRide.numPassengers) <= 5) {
        // Perform merge logic here (e.g., combine rides, mark as deleted, etc.)
        Alert.alert('Merge Successful', 'The rides have been merged successfully.');
        // Example: Mark both rides as deleted for simplicity
        setData(prevData =>
          prevData.map(item =>
            (item.id === id || item.id === selectedForMerge.id) ? { ...item, deleted: true } : item
          )
        );
      } else {
        Alert.alert('Merge Failed', 'The car would be too full with this merge.');
      }

      setSelectedForMerge(null); // Reset merge selection
    }
  };

  const renderItem = ({ item }) => {
    return (
      <QueueItem
        id={item.id}
        requestors_name={item.requestors_name}
        fromWhere={item.fromWhere}
        toWhere={item.toWhere}
        numPassengers={item.numPassengers}
        onDelete={() => handleDelete(item.id)}
        onAttemptMerge={handleAttemptMerge}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {}}
          />
        }
      />
    </View>
  );
};

export default QueueList;
