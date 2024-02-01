import { createStackNavigator } from '@react-navigation/stack';
import RideDetailScreen from '../screens/RideDetailScreen';
import QueueScreen from '../screens/QueueScreen';


const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MAIN" component={QueueScreen} />
            <Stack.Screen name="Ride" component={RideDetailScreen} />
        </Stack.Navigator>

    );
}

