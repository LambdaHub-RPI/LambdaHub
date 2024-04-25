import React from 'react';
import { StyleSheet, View, Text, Animated, PanResponder, HapticFeedback } from 'react-native';

const QueueItem = ({ data, onDelete, swipeThreshold = 100 }) => {
  const pan = new Animated.ValueXY();

  // Setup the pan responder to handle user gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      if (pan.x._value > swipeThreshold) {
        HapticFeedback.trigger('impactLight');
        onDelete(data.identifier);
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Swipe color change effect
  const swipeOutputRange = pan.x.interpolate({
    inputRange: [0, 100],
    outputRange: ['#FFFFFF', '#FF6347'], // Background color changes as user swipes
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    backgroundColor: swipeOutputRange,
  };

  const formattedTime = new Date('1970-01-01T' + data.rideTime + 'Z').toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        { transform: [{ translateX: pan.x }] },
        data.isEmergency && styles.emergencyItem,
        animatedStyle
      ]}
      {...panResponder.panHandlers}
      accessible
      accessibilityLabel="Swipe to delete"
      accessibilityHint="Swipe right to delete the item"
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
