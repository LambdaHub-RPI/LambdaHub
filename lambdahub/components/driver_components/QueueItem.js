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
            <Text>{text}</Text>
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
        backgroundColor: '#c5c5c5',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default QueueItem;
