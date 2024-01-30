import { StyleSheet,TouchableOpacity, Text } from "react-native";

const QueueItem = ({ id,requestors_name, fromWhere, toWhere, numPassengers }) => {
    return (
        <TouchableOpacity onPress={() => {}}>
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
        padding: 40,
    }
})

export default QueueItem;