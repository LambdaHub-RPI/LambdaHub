import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function AgendaScreen() {
    const [items, setItems] = useState({});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedDate, setEditedDate] = useState('');
    const [editedStartTime, setEditedStartTime] = useState('');
    const [editedEndTime, setEditedEndTime] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log("running backend");
            const response = await fetch('http://129.161.214.87:8000/event-api/events/');
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
                    date: event.date,
                });
            });

            setItems(updatedItems);
        } catch (error) {
            console.error('Error loading items:', error);
        }
    };

    const handleDeleteEvent = async (event) => {
        try {
            // Send a DELETE request to your Django backend API
            const response = await fetch(`http://129.161.214.87:8000/event-api/events/${event.id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            Alert.alert('Error', 'Failed to delete event');
        }
    };

    const handleEditEvent = async () => {
        try {
            // Send a PUT request to update the event
            const response = await fetch(`http://129.161.214.87:8000/event-api/events/${selectedEvent.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editedName,
                    description: editedDescription,
                    date: editedDate,
                    starttime: editedStartTime,
                    endtime: editedEndTime,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update event');
            }

            // Refresh data after update
            fetchData();

            // Close modal
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating event:', error);
            Alert.alert('Error', 'Failed to update event');
        }
    };

    const handleEventPress = (item) => {
        setSelectedEvent(item);
        setEditedName(item.name);
        setEditedDescription(item.data);
        setEditedDate(item.date);
        setEditedStartTime(item.startTime);
        setEditedEndTime(item.endTime);
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Agenda
                items={items}
                renderItem={(item, isFirst) => (
                    <TouchableOpacity style={styles.item} onPress={() => handleEventPress(item)}>
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
                renderEmptyDate={() => {
                    return (
                        <View style={styles.emptyDateItem}>
                            <Text style={styles.emptyDateText}>No Events Scheduled</Text>
                        </View>
                    );
                }}
                loadItemsForMonth={async (data) => {
                    console.log("running this");
                    const currentDate = new Date();
                    const updatedItems = { ...items };
                    var date = new Date(data.dateString);

                    if (!updatedItems[currentDate.toISOString().slice(0, 10)]) {
                        date = currentDate;
                    }

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

            {/* Modal for editing event */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Edit Event</Text>
                        <TextInput
                            style={styles.input}
                            value={editedName}
                            onChangeText={setEditedName}
                            placeholder="Event Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedDescription}
                            onChangeText={setEditedDescription}
                            placeholder="Description"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedDate}
                            onChangeText={setEditedDate}
                            placeholder="Date (YYYY-MM-DD)"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedStartTime}
                            onChangeText={setEditedStartTime}
                            placeholder="Start Time (HH:MM)"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedEndTime}
                            onChangeText={setEditedEndTime}
                            placeholder="End Time (HH:MM)"
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Save" onPress={handleEditEvent} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
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
        height: 120,
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
        shadowRadius: 3.84,
        elevation: 2,
    },
    emptyDateText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    deleteButton: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
});
