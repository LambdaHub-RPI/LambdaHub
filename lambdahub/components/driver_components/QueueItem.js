import React from 'react';
import { StyleSheet, View, Text, Animated, PanResponder } from 'react-native';

const QueueItem = ({ data, onDelete }) => {
  const pan = new Animated.ValueXY();

  // Setup the pan responder to handle user gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      // Check if the swipe distance is sufficient to trigger deletion
      if (pan.x._value > 100) { // Threshold for a significant swipe to the right
        onDelete(data.identifier); // Call the onDelete function passed from the parent component
      } else {
        // Reset the animation if not swiped far enough
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Formatting rideTime for display
  const formattedTime = new Date('1970-01-01T' + data.rideTime + 'Z').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Animated.View
      style={[styles.itemContainer, { transform: [{ translateX: pan.x }] }, data.isEmergency && styles.emergencyItem]}
      {...panResponder.panHandlers}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.detail}>{data.startlocation}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>To:</Text>
          <Text style={styles.detail}>{data.endlocation}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Passengers:</Text>
          <Text style={styles.detail}>{data.numPassengers}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.detail}>{formattedTime}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  emergencyItem: {
    backgroundColor: '#FF6347', // Tomato red for emergency items
  },
  content: {
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'center', // Centers content vertically
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'center', // Align items in the center vertically within each row
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  detail: {
    fontSize: 14,
    marginLeft: 5,
  },
});

export default QueueItem;
