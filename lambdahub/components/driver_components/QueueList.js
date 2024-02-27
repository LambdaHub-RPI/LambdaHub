import React, { useEffect } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import QueueItem from './QueueItem';

const QueueList = ({ data, setData }) => {
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

  const renderItem = ({ item }) => {
    return (
      <QueueItem
        id={item.id}
        requestors_name={item.requestors_name}
        fromWhere={item.fromWhere}
        toWhere={item.toWhere}
        numPassengers={item.numPassengers}
        onDelete={() => handleDelete(item.id)}
      />
    );
  };

  const handleRefresh = () => {
    // Handle refreshing the list (e.g., fetching new data from backend)
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()} // Ensure key is a string
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
      />
    </View>
  );
};

export default QueueList;
