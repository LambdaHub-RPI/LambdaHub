import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native"

const RideDetailScreen = () => {
    const route = useRoute()

    const { rideId, requestors_name, fromWhere, toWhere, numPassengers } = route.params
    return (
        <View style={styles.screen}>



            <Text style = {styles.header}> ride detail screen for {rideId} name is {requestors_name}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        textAlign: 'justify',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default RideDetailScreen;
