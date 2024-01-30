import { View, Text, FlatList, RefreshControl } from "react-native";
import { DUMMY_DATA } from "../../data/dummy";
import QueueItem from "./queue-item";



const QueueList = () => {
    const renderItem = ({item}) => {
        return <QueueItem id={item.id} requestors_name={item.requestors_name} fromWhere={item.fromWhere} toWhere={item.toWhere} numPassengers={item.numPassengers}/>
    }
    return (
        <View>
            <FlatList
                data={DUMMY_DATA}        
                keyExtractor={item=>item.id}
                renderItem={renderItem}
                refreshControl = {
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=>console.log("refreshing")}
                    />
                }
                

    
            />

        </View>

    );
}
export default QueueList;