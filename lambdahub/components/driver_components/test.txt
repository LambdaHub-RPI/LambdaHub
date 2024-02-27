import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { DUMMY_DATA } from '../../data/dummy';
import QueueItem from './QueueItem';

const QueueList = () => {
    const [queueData, setQueueData] = useState(DUMMY_DATA);
    const [showEndOfListAlert, setShowEndOfListAlert] = useState(true);

    useEffect(() => {
        const allDeleted = queueData.every(item => item.deleted);
        if (allDeleted) {
            Alert.alert('End of List', 'No more items to display.');
        }
    }, [queueData]);

    const handleDelete = (id) => {
        setQueueData(prevData =>
            prevData.map(item => (item.id === id ? { ...item, deleted: true } : item))
        );
        setShowEndOfListAlert(false);
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
                data={queueData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
            />
        </View>
    );
};

export default QueueList;
