import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Modal, View } from 'react-native';

const QueueItem = ({ id, requestors_name, fromWhere, toWhere, numPassengers }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = () => {
        // Implement delete functionality here
        setModalVisible(false); // Close modal after deletion
    };

    const handleJoin = () => {
        // Implement join functionality here
    };

    return (
        <View>
            <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
                <Text style={styles.cardText}>{requestors_name} with {numPassengers} people.</Text>
                <Text>{fromWhere} to {toWhere}</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{requestors_name}</Text>
                        <Text>{fromWhere} to {toWhere}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                                <Text style={styles.buttonText}>Complete Ride</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.joinButton]} onPress={handleJoin}>
                                <Text style={styles.buttonText}>Join Ride</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        marginVertical: 5,
        padding: 30,
    },
    cardText: {
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    button: {
        width: '48%', // Adjust as needed
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    joinButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#c5c5c5',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'black',
    },
});

export default QueueItem;
