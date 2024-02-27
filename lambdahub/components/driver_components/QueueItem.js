import React, { useState } from 'react';
import { StyleSheet, Animated, PanResponder, Text, View } from 'react-native';

const SlideableButton = ({ text, onDelete }) => {
    const pan = useState(new Animated.ValueXY())[0];

    const panResponder = useState(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                // Limit movement to the left
                if (gesture.dx < -50) {
                    pan.setValue({ x: gesture.dx, y: 0 });
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx < -150) {
                    // If swiped far enough to the left, trigger onDelete
                    Animated.timing(pan, {
                        toValue: { x: -500, y: 0 },
                        duration: 200,
                        useNativeDriver: false,
                    }).start(() => {
                        onDelete();
                    });
                } else {
                    // If not swiped far enough, reset position
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    )[0];

    return (
        <Animated.View
            style={[
                styles.slideableButton,
                {
                    transform: [{ translateX: pan.x }],
                },
            ]}
            {...panResponder.panHandlers}
        >
            <Text style={styles.slideableButtonText}>{text}</Text>
        </Animated.View>
    );
};

const QueueItem = ({ id, requestors_name, fromWhere, toWhere, numPassengers, onDelete }) => {
    const [deleted, setDeleted] = useState(false);

    const handleDelete = () => {
        onDelete();
        setDeleted(true); // Set the "Deleted" flag to true
    };

    return !deleted ? (
        <SlideableButton
            text={`${requestors_name} with ${numPassengers} passengers\n${fromWhere} to ${toWhere}`}
            onDelete={handleDelete}
        />
    ) : null;
};

const styles = StyleSheet.create({
    slideableButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    slideableButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});

export default QueueItem;
