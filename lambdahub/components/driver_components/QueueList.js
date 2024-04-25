import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import QueueItem from './QueueItem'; // Ensure the import path is correct based on your project structure

const QueueList = ({ data, onDelete, onLoadMore, onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle the refresh action
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false)); // Make sure to handle errors as well
  }, [onRefresh]);

  // Function to render each item in the list
  const renderItem = ({ item }) => (
    <QueueItem data={item} onDelete={onDelete} />
  );

  // Function to provide a unique key for each item
  const keyExtractor = (item) => item.identifier.toString();

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5} // Customize the threshold depending on the behavior you want
        initialNumToRender={10} // Adjust number based on performance and data size
      />
    </View>
  );
};

export default QueueList;
