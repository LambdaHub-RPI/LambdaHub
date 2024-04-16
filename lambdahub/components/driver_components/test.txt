import React from 'react';
import { StyleSheet, View, Text, Animated, PanResponder } from 'react-native';

const QueueItem = ({ data }) => {
  const pan = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: false,
      }).start();
    },
  });

  // Formatting rideTime for display
  const formattedTime = new Date('1970-01-01T' + data.rideTime + 'Z').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Animated.View
      style={[styles.itemContainer, { transform: [{ translateX: pan.x }] }]}
      {...panResponder.panHandlers}
    >
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  detail: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default QueueItem;
