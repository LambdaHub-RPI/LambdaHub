import { NavigationContainer } from "@react-navigation/native";
//import { AppNavigator } from '../navigation/AppNavigator';

import { createStackNavigator } from "@react-navigation/stack";
import RideDetailScreen from "./RideDetailScreen";
import QueueScreen from "./QueueScreen";



const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MAIN" component={QueueScreen} />
      <Stack.Screen name="Ride" component={RideDetailScreen} />
      
    </Stack.Navigator>
  );
}


export default function DriverScreen() { 
  return (
    <NavigationContainer independent={true}>
      <AppNavigator />
    </NavigationContainer>
  );
}