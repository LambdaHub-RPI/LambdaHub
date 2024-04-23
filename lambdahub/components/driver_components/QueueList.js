import React from 'react';
import { View, FlatList } from 'react-native';
import QueueItem from './QueueItem'; // Ensure the import path is correct based on your project structure

const QueueList = ({ data, onDelete }) => {
  // this is going to pass onDelete to each ride, then when the ride is swiped it is going to call the deleteRide
  // in queuescreen so that when you swipe on a ride it is going to call that function and make the delete request.
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.identifier.toString()}
        renderItem={({ item }) => <QueueItem data={item} onDelete={onDelete} />}
      />
    </View>
  );
};

export default QueueList;
