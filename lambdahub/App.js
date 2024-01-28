import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AnnouncementScreen from './screens/AnnouncementScreen';
import CalendarScreen from './screens/CalendarScreen';
import DriverScreen from './screens/DriverScreen';
import HomeScreen from './screens/HomeScreen';


const Drawer = createDrawerNavigator();

export default function App() {
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Announcements" component={AnnouncementScreen} />
                <Drawer.Screen name="Calendar" component={CalendarScreen} />
                <Drawer.Screen name="Driver Queue" component={DriverScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}