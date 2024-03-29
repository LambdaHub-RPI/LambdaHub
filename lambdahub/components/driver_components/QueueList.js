// QueueList.js
import React from 'react';
import { View, FlatList } from 'react-native';
import QueueItem from './QueueItem';

const QueueList = ({ data }) => {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.identifier.toString()}
        renderItem={({ item }) => <QueueItem data={item} />}
      />
    </View>
  );
};

export default QueueList;
