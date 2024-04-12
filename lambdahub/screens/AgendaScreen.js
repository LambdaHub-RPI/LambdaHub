import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import {React, useState, useEffect} from 'react';
import {Agenda} from 'react-native-calendars';



export default function AgendaScreen() {

    const [items, setItems] = useState({
        "2024-04-09": [{ name: "Meeting 1", data: 'this is the first meeting', startTime: '12:00:00', endTime: '3:00:00' }],
        "2024-04-10": [{ name: "Meeting 2", data: 'this is the first meeting' }],
        "2024-04-11": [{ name: "Meeting 3", data: 'this is the first meeting' }]
        //"2024-04-12": []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(':8000/event-api/events/');
            const data = await response.json();

            const updatedItems = { ...items };

            data.forEach((event) => {
                const time = new Date(event.date);
                const strTime = time.toISOString().slice(0, 10);

                if (!updatedItems[strTime]) {
                    updatedItems[strTime] = [];
                }

                updatedItems[strTime].push({
                    name: event.name,
                    startTime: event.starttime,
                    endTime: event.endtime,
                    data: event.description,
                });
            });

            setItems(updatedItems);
        } catch (error) {
            console.error('Error loading items:', error);
        }
    };
    
    
    return (
        <SafeAreaView style={styles.container}>
            <Agenda
                items = {items}
                renderItem={(item, isFirst) => (
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.time}>{item.startTime} - {item.endTime}</Text>
                            <Text style={styles.itemData}>{item.data}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                renderEmptyDate={() => {
                    return (
                      <View style={styles.emptyDateItem}>
                        <Text style={styles.emptyDateText}>No Events Scheduled</Text>
                      </View>
                    );
                }}
                loadItemsForMonth={ async (data) => {
                    const currentDate = new Date();
                    const updatedItems = { ...items };
                    var date = new Date(data.dateString);

                    if(!updatedItems[currentDate.toISOString().slice(0, 10)]){
                        date = currentDate;
                    }

                    // Load the last 10 days and next 31 with empty lists
                    for (let i = -10; i < 31; i++) {
                        const newdate = new Date();
                        newdate.setDate(date.getDate() + i);
                        //console.log(date.toISOString().slice(0, 10), i);
                        if(!updatedItems[newdate.toISOString().slice(0, 10)]){
                            updatedItems[newdate.toISOString().slice(0, 10)] = []; 
                        }
                    }
                    setItems(updatedItems);
                }}
            />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginHorizontal: 10,
        marginLeft: 0,
        marginTop: 10,
        height:100,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      itemContent: {
        flex: 1,
      },
      itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
      },
      time: {
        fontSize: 14,
        marginBottom: 5,
        color: '#555',
      },
      itemData: {
        fontSize: 14,
        color: '#777',
      },
      emptyDateItem: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        marginTop: 10,
        marginLeft: 0,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        
      },
      emptyDateText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
      },
      customDay: {
        margin: 10,
        fontSize: 24,
        color: 'green'
      },
      dayItem: {
        marginLeft: 34
      }
});
