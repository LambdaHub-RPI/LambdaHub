import React, { useState, useMemo } from 'react';
import { StyleSheet, Animated, PanResponder, Text, View, Alert } from 'react-native';

const SlideableButton = ({ text, onDelete, onLongPress }) => {
    const pan = useState(new Animated.ValueXY())[0];

    // Prepare animated event and pan responder with added long-press logic
    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: pan.x }
        ], {
            useNativeDriver: false,
        }),
        onPanResponderRelease: (_, gesture) => {
            if (gesture.dx < -150) {
                Animated.timing(pan, {
                    toValue: { x: -500, y: 0 },
                    duration: 200,
                    useNativeDriver: true,
                }).start(onDelete);
            } else {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5,
                    useNativeDriver: true,
                }).start();
            }
        },
        onLongPress: onLongPress, // Handle long press
    }), [pan, onDelete, onLongPress]);

    return (
        <Animated.View
            style={[
                styles.slideableButton,
                {
                    transform: [{ translateX: pan.x }],
                    opacity: pan.x.interpolate({
                        inputRange: [-200, 0],
                        outputRange: [0.5, 1],
                        extrapolate: 'clamp',
                    }),
                },
            ]}
            {...panResponder.panHandlers}
        >
            <Text style={styles.slideableButtonText}>{text}</Text>
        </Animated.View>
    );
};

const QueueItem = ({ id, requestors_name, fromWhere, toWhere, numPassengers, onDelete, onAttemptMerge }) => {
    const [deleted, setDeleted] = useState(false);

    const handleDelete = () => {
        onDelete();
        setDeleted(true); // Set the "Deleted" flag to true
    };

    const handleLongPress = () => {
        onAttemptMerge(id, numPassengers); // Parent handles logic to determine if merge is possible
    };

    return !deleted ? (
        <SlideableButton
            text={`${requestors_name} with ${numPassengers} passengers\n${fromWhere} to ${toWhere}`}
            onDelete={handleDelete}
            onLongPress={handleLongPress}
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
