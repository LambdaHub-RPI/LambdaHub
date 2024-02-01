import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from '../navigation/AppNavigator';




export default function DriverScreen() { 
  return (
    <NavigationContainer independent={true}>
      <AppNavigator />
    </NavigationContainer>
  );
}