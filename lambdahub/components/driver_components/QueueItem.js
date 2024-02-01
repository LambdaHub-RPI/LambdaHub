import { useNavigation } from "@react-navigation/native";
import { StyleSheet,TouchableOpacity, Text } from "react-native";
import AppNavigator from "../../navigation/AppNavigator";



const QueueItem = ({ id,requestors_name, fromWhere, toWhere, numPassengers }) => {
    const navigation = useNavigation()
    return (

        <TouchableOpacity style={styles.card} onPress={() =>navigation.navigate("Ride", {rideId: id})}>
            <Text>{requestors_name} with {numPassengers} people.</Text>
            <Text>{fromWhere} to {toWhere}{'\n'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth : 1,
        borderColor : '#c5c5c5',
        borderRadius: 10,
        marginVertical: 5,
        padding: 30,
    }
})

export default QueueItem;